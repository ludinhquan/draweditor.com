import {DomainModel} from "@draweditor.com/core";
import {DataSource, IDataSource} from "@draweditor.com/dataAccess";
import {Module} from "@nestjs/common";
import {UserService} from "./IUserService";
import {UserServiceImpl} from "./userServiceImpl";

@Module({
  providers: [
    {
      provide: UserService, 
      useFactory(...args: [IDataSource, DomainModel]) {return new UserServiceImpl(...args)},
      inject: [DataSource, DomainModel]
    }
  ],
  exports: [UserService]
})
export class UserModule {}
