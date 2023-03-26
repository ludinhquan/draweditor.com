import {IUserService, UserModule, UserService} from "@/modules/users";
import {Module} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {JwtModule, JwtService} from "@nestjs/jwt";
import {PassportModule} from "@nestjs/passport";
import {AuthenticationController} from "./authenticationController";
import {AuthenticationService} from "./authenticationService";
import {LocalStrategy} from "./methods";

@Module({
  imports: [UserModule, PassportModule, JwtModule],
  providers: [
    {
      provide: AuthenticationService,
      useFactory(...args: [IUserService, JwtService, ConfigService]) {
        return new AuthenticationService(...args)
      },
      inject: [UserService, JwtService, ConfigService]
    },
    LocalStrategy,
  ],
  controllers: [AuthenticationController]
})
export class AuthenticationModule {}
