import {Http} from "@draweditor.com/common";
import {omit} from "@draweditor.com/core";
import {Body, Controller, Get, Post, Req, UseGuards} from "@nestjs/common";
import {Request} from "express";
import {AuthenticationService} from "./authenticationService";
import {LocalGuard, JwtGuard} from "./methods";

type TSignInDto = {
  phoneNumber: string
}

type TOtpVerificationDto = {
  phoneNumber: string
  otp: string
}

@Http()
@Controller('auth')
export class AuthenticationController {
  constructor(
    private authenticationService: AuthenticationService
  ){}

  @Post('otp/sms')
  async signIn(
    @Body() dto: TSignInDto
  ) {
    const result = await this.authenticationService.signIn(dto);
    return result
  }

  @Post('otp/sms/verification')
  async verifyOtpCode(
    @Body() dto: TOtpVerificationDto
  ) {
    const result = await this.authenticationService.verifyOtpCode(dto);
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
