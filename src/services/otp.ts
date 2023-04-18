import {hotp, authenticator} from "otplib";

export const OtpService = Symbol('OtpService')

export interface IOtpService {
  generateSecret(): string
  generate(secret: string, counter: number): string
  verify(token: string, secret: string, counter: number): boolean
}

export class OtpServiceImpl implements IOtpService {
  private readonly OTP_DIGITS = 6;

  constructor() {
    hotp.options = {
      digits: this.OTP_DIGITS,
    }
  }

  public generateSecret() {
    return authenticator.generateSecret();
  }

  public generate(secret: string, counter: number): string {
    return hotp.generate(secret, counter);
  }

  public verify(token: string, secret: string, counter: number): boolean {
    return hotp.check(token, secret, counter)
  }
}
