import {Body, Controller, Post} from "@nestjs/common";
import {SmsService} from "./smsService";

class InitiateVerificationDto {
  phoneNumber: string
}

class CheckVerificationCodeDto {
  phoneNumber: string
  code: string
}

@Controller('sms')
export class SmsController {
  constructor(
    private smsService: SmsService
  ) {}

  @Post('initiate-verification')
  async initiatePhoneNumberVerification(
    @Body() dto: InitiateVerificationDto
  ) {
    const {phoneNumber} = dto
    const result = await this.smsService.initiateVerification(phoneNumber);
    return result;
  }

  @Post('check-verification-code')
  checkVerificationCode(
    @Body() dto: CheckVerificationCodeDto
  ) {
    const {phoneNumber} = dto
  }
}
