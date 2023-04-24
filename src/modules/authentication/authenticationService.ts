import {IUser, IUserService} from "@/modules/users";
import {IOtpService} from "@/services/otp";
import {Result} from "@draweditor.com/core";
import {ConfigService} from "@nestjs/config";
import {ISmsService} from "../sms/ISmsService";
import {SignInDto} from "./authenticationDto";
import {Jwt, Password} from "./domain";
import {TokenPayload} from "./interfaces";

export class AuthenticationService {
  constructor(
    private userService: IUserService,
    private configService: ConfigService,
    private otpService: IOtpService,
    private smsService: ISmsService,
  ) {}

  async signIn(dto: SignInDto): Promise<void> {
    let user = await this.userService.getByPhoneNumber(dto.phoneNumber);

    if (!user) {}

    const counter = user.counter ?? 0;
    const secret = this.otpService.generateSecret();
    const otp = this.otpService.generate(secret, counter);

    await this.smsService.sendSms(user.phoneNumber, `Your verification code is ${otp}`)
    await this.userService.setOtp(user.id, {otp, secret, counter});
  }

  async verifyOtpCode(dto: {phoneNumber: string, otp: string}) {
    let user = await this.userService.getByPhoneNumber(dto.phoneNumber);

    const isValidOtp = this.otpService.verify(dto.otp, user.secret, user.counter);

    if (isValidOtp) await this.userService.setOtp(user.id, {counter: user.counter + 1});

    console.log({isValidOtp});
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
