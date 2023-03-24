import {DataSource, IDataSource} from "@draweditor.com/dataAccess";
import {Module} from "@nestjs/common";
import {UserService} from "./IUserService";
import {UserServiceImpl} from "./userServiceImpl";

@Module({
  providers: [
    {
      provide: UserService, 
      useFactory(...args: [IDataSource]) {return new UserServiceImpl(...args)},
      inject: [DataSource]
    }
  ],
  exports: [UserService]
})
export class UserModule {}
