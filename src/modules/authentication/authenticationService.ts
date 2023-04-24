import {configs} from "@/config";
import {IUser, IUserService} from "@/modules/users";
import {IOtpService} from "@/services/otp";
import {Result} from "@draweditor.com/core";
import {ConfigService} from "@nestjs/config";
import {ISmsService} from "../sms/ISmsService";
import {SignInDto} from "./authenticationDto";
import {Jwt, Password} from "./domain";
import {TokenPayload} from "./interfaces";

export class AuthenticationService {
  constructor(
    private userService: IUserService,
    private configService: ConfigService,
    private otpService: IOtpService,
    private smsService: ISmsService,
  ) {}

  async signIn(dto: SignInDto): Promise<void> {
    let user = await this.userService.getByPhoneNumber(dto.phoneNumber);

    if (!user) {
      user = await this.userService.createUser({
        phoneNumber: dto.phoneNumber,
        counter: 0,
        secret: this.otpService.generateSecret()
      })
    }

    const counter = user.counter ?? 0;
    const secret = user.secret;

    console.log(counter, secret)
    const otp = this.otpService.generate(secret, counter);

    console.log({counter, secret, otp})
    await this.userService.setOtp(user.id, {secret, counter});

    console.log(configs.OTP_MESSAGE.replace('{otp}', otp))
    // this.smsService.sendSms(user.phoneNumber, configs.OTP_MESSAGE.replace('{otp}', otp));
  }

  async verifyOtpCode(dto: {phoneNumber: string, otp: string}) {
    let user = await this.userService.getByPhoneNumber(dto.phoneNumber);

    const isValidOtp = this.otpService.verify(dto.otp, user.secret, user.counter);

    if (isValidOtp) await this.userService.setOtp(user.id, {counter: user.counter + 1});

    const accessToken = this.getCookieWithJwtAccessToken(user);

    console.log({isValidOtp, accessToken});
  }

  async getAuthenticatedUser(email: string, password: string): Promise<Result<IUser>> {
    const user = await this.userService.getByEmail(email);

    if (!user) return Result.fail(`User with this email does not exist`)

    const isMatchingPassword = await Password.compare(password, user.password);
    if (!isMatchingPassword) return Result.fail(`Wrong credentials provided`)

    return Result.ok(user)
  }

  public getCookieWithJwtAccessToken(user: IUser) {
    const payload: TokenPayload = {userId: user.id};
    const token = Jwt.sign(payload, {
      secret: configs.JWT_ACCESS_TOKEN_SECRET,
      expiresIn: `${configs.JWT_ACCESS_TOKEN_EXPIRATION_TIME}s`,
    });
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${configs.JWT_ACCESS_TOKEN_EXPIRATION_TIME}`;
  }

  public getCookiesForLogOut() {
    return [
      'Authentication=; HttpOnly; Path=/; Max-Age=0',
      'Refresh=; HttpOnly; Path=/; Max-Age=0',
    ];
  }
}
