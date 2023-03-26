import {CreateUserResponse, IUser, IUserService} from "@/modules/users";
import {Either, InternalServerError, Result} from "@draweditor.com/core";
import {RegisterDto} from "./authenticationDto";
import {Password} from "./domain/password";

type RegistrationResponse = Either<
  InternalServerError,
  Result<Partial<IUser>>
> | CreateUserResponse;

export class AuthenticationService {
  constructor(
    private userService: IUserService
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
}
