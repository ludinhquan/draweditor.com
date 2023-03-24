import {IUserService, UserService} from "@modules/users";
import {Module} from "@nestjs/common";
import {AuthenticationController} from "./authenticationController";
import {AuthenticationService} from "./authenticationService";

@Module({
  providers: [
    {
      provide: AuthenticationService,
      useFactory(...args: [IUserService]) {
        return new AuthenticationService(...args)
      },
      inject: [UserService]
    }
  ],
  controllers: [AuthenticationController]
})
export class AuthenticationModule {}
