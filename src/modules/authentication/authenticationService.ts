import {Result} from "@draweditor.com/core";
import {IUserService} from "@modules/users";
import {RegisterDto} from "./authenticationDto";
import {Password} from "./domain/password";

export class AuthenticationService {
  constructor(
    private userService: IUserService
  ) {}

  async register(registerDto: RegisterDto) {
    const hashedPassword = await Password.hash(registerDto.password);

    const createResult = await this.userService.create({
      name: registerDto.name,
      email: registerDto.email,
      password: hashedPassword
    });

    if(createResult.isFailure) return createResult

    return Result.ok(createResult.getValue())
  }
}
