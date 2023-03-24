import {Body, Controller, Post} from "@nestjs/common";
import {AuthenticationService} from "./authenticationService";

type RegisterDto = {
  name: string
  username: string
  password: string
  email: string
  phoneNumber: string
}

@Controller('authentication')
export class AuthenticationController {
  constructor(
    private authenticationService: AuthenticationService
  ){}

  @Post('register')
  async register(@Body() registrationData: RegisterDto) {
    const user = await this.authenticationService.register(registrationData);
    // await this.emailConfirmationService.sendVerificationLink(
    //   registrationData.email,
    // );
    // return user;
  }
}
