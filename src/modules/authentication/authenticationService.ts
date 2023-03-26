import {CreateUserResponse, IUser, IUserService} from "@/modules/users";
import {Either, InternalServerError, Result} from "@draweditor.com/core";
import {RegisterDto} from "./authenticationDto";
import {Jwt, Password} from "./domain";
import {TokenPayload} from "./interfaces";
import { JwtService } from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";

type RegistrationResponse = Either<
  InternalServerError,
  Result<Partial<IUser>>
> | CreateUserResponse;


export class AuthenticationService {
  constructor(
    private userService: IUserService,
    private configService: ConfigService,
  ) {}

  async register(registerDto: RegisterDto): Promise<RegistrationResponse> {
    const hashedPassword = await Password.hash(registerDto.password);

    const createResult = await this.userService.create({
      name: registerDto.name,
      email: registerDto.email,
      password: hashedPassword
    });

    return createResult
  }

  async getAuthenticatedUser(email: string, password: string): Promise<Result<IUser>> {
    const user = await this.userService.getByEmail(email);

    if (!user) return Result.fail(`User with this email does not exist`)

    const isMatchingPassword = await Password.compare(password, user.password);
    if (!isMatchingPassword) return Result.fail(`Wrong credentials provided`)

    return Result.ok(user)
  }

  public getCookieWithJwtAccessToken(user: IUser) {
    const payload: TokenPayload = {userId: user.id};
    const token = Jwt.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')}s`,
    });
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
    )}`;
  }

  public getCookieWithJwtRefreshToken(user: IUser) {
    const payload: TokenPayload = {userId: user.id};
    const token = Jwt.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')}s`,
    });
    const cookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
    )}`;
    return {
      cookie,
      token,
    };
  }

  public getCookiesForLogOut() {
    return [
      'Authentication=; HttpOnly; Path=/; Max-Age=0',
      'Refresh=; HttpOnly; Path=/; Max-Age=0',
    ];
  }
}
