import {Http} from "@draweditor.com/common";
import {omit} from "@draweditor.com/core";
import {Body, Controller, Get, Post, Req, UseGuards} from "@nestjs/common";
import {Request} from "express";
import {AuthenticationService} from "./authenticationService";
import {LocalGuard, JwtGuard} from "./methods";

type RegisterDto = {
  name: string
  username: string
  password: string
  email: string
  phoneNumber: string
}

@Http()
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
  @UseGuards(LocalGuard)
  async login(@Req() req: Request) {
    const {user} = req

    const accessToken = this.authenticationService.getCookieWithJwtAccessToken(user);
    req.res.setHeader('Set-Cookie', [accessToken]);

    return omit(user, ['password']);
  }

  @Get()
  @UseGuards(JwtGuard)
  async authenticate(@Req() req: Request) {
    const {user} = req

    return omit(user, ['password']);
  }
}
