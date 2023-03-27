import {IUserService, UserModule, UserService} from "@/modules/users";
import {Module} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {PassportModule} from "@nestjs/passport";
import {AuthenticationController} from "./authenticationController";
import {AuthenticationService} from "./authenticationService";
import {JwtStrategy, LocalStrategy} from "./methods";

@Module({
  imports: [UserModule, PassportModule],
  providers: [
    {
      provide: AuthenticationService,
      useFactory(...args: [IUserService, ConfigService]) {
        return new AuthenticationService(...args)
      },
      inject: [UserService, ConfigService]
    },
    {
      provide: JwtStrategy,
      useFactory(...args: [IUserService, ConfigService]) {
        return new JwtStrategy(...args)
      },
      inject: [UserService, ConfigService]
    },
    LocalStrategy,
  ],
  controllers: [AuthenticationController]
})
export class AuthenticationModule {}
