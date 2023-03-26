import {Body, Controller, Post, Req, UseGuards} from "@nestjs/common";
import {Request} from "express";
import {AuthenticationService} from "./authenticationService";
import {LocalAuthenticationGuard} from "./methods";

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
    const result = await this.authenticationService.register(registrationData);
    if (result.isLeft()) return result.value

    return result.value.getValue()
  }

  @Post('login')
  @UseGuards(LocalAuthenticationGuard)
  async login(@Req() req: Request) {
    const {user} = req

    const accessToken = this.authenticationService.getCookieWithJwtAccessToken(user);
    req.res.setHeader('Set-Cookie', [accessToken]);

    return user
  }
}
