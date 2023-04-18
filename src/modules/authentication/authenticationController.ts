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

type SignInDto = {
  phoneNumber: string
}

@Http()
@Controller('authentication')
export class AuthenticationController {
  constructor(
    private authenticationService: AuthenticationService
  ){}

  @Post('signin')
  async signIn(
    @Body() dto: SignInDto
  ){
    const result = await this.authenticationService.signIn(dto);
    return result
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
