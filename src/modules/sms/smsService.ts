import {Injectable} from "@nestjs/common";
import {authenticator, hotp, totp} from 'otplib';
 
@Injectable()
export class SmsService {
  constructor() {
    // totp.options = {
    //   step: 10,
    // }
  }

  async initiateVerification(phoneNumber: string) {
    const secret = authenticator.generateSecret()
    const counter = 1;
    const otp = hotp.generate(secret, counter);
    const isValid = hotp.check(otp, secret, 1);

    console.log({otp, isValid});
  }

  confirmPhoneNumber() {}
}
