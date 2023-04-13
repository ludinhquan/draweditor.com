import { totp } from "otplib"

type GenerateOptions = {
  secret: string
}

interface IOtpService {
  generate(options: GenerateOptions): string
  verify(otp: string, secret: string): boolean
}

export class OtpService implements IOtpService {
  private readonly OTP_DIGITS = 6;

  constructor() {
    totp.options = {
      digits: this.OTP_DIGITS,
    }
  }

  generate(options: GenerateOptions) {
    return totp.generate(options.secret)
  }

  verify(otp: string, secret: string) {
    return true
  }
}
