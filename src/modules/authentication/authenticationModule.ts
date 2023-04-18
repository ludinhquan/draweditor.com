import {DomainModelModule} from "@/common";
import {IUserService, UserModule, UserService} from "@/modules/users";
import {IOtpService, OtpService, OtpServiceImpl} from "@/services/otp";
import {Module} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {PassportModule} from "@nestjs/passport";
import {AuthenticationController} from "./authenticationController";
import {AuthenticationService} from "./authenticationService";
import {JwtStrategy, LocalStrategy} from "./methods";

@Module({
  imports: [UserModule, PassportModule, DomainModelModule],
  providers: [
    {
      provide: AuthenticationService,
      useFactory(...args: [IUserService, ConfigService, IOtpService]) {
        return new AuthenticationService(...args)
      },
      inject: [UserService, ConfigService, OtpService]
    },
    {
      provide: JwtStrategy,
      useFactory(...args: [IUserService, ConfigService]) {
        return new JwtStrategy(...args)
      },
      inject: [UserService, ConfigService]
    },
    {
      provide: OtpService, useClass: OtpServiceImpl
    },
    LocalStrategy,
  ],
  controllers: [AuthenticationController]
})
export class AuthenticationModule {}
