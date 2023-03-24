import {Result} from "@draweditor.com/core";
import {IDataSource} from "@draweditor.com/dataAccess";
import {IUser, User} from "./domain";
import {IUserService} from "./IUserService";
import {CreateUserDto} from "./userDto";

export class UserServiceImpl implements IUserService {
  constructor(
    private dataSource: IDataSource
  ){}

  getByEmail(email: string): Promise<IUser> {
    throw new Error('getByEmail missing')
  }

  getById(id: string): Promise<IUser> {
    throw new Error('getById missing')
  }

  async create(createUserDto: CreateUserDto): Promise<Result<IUser>>{
    const userRepository = await this.dataSource.getRepository();
    const userResult = User.create({
      name: createUserDto.name,
      email: createUserDto.email,
      password: createUserDto.password
    })

    if (userResult.isFailure) return Result.fail(userResult.getError());

    const user = userResult.getValue();

    await userRepository.create(user.data);

    return 
  }
}
