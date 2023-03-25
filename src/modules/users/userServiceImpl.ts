import {DomainModel, Result} from "@draweditor.com/core";
import {IDataSource} from "@draweditor.com/dataAccess";
import {IUser, User} from "./domain";
import {IUserService} from "./IUserService";
import {CreateUserDto} from "./userDto";

export class UserServiceImpl implements IUserService {
  constructor(
    private dataSource: IDataSource,
    private domainModel: DomainModel
  ){}

  getByEmail(email: string): Promise<IUser> {
    throw new Error('getByEmail missing')
  }

  getById(id: string): Promise<IUser> {
    throw new Error('getById missing')
  }

  async create(createUserDto: CreateUserDto): Promise<Result<IUser>>{
    const userRepository = await this.dataSource.getRepository();
    const model = this.domainModel.getModel('user');

    const userResult = User.create({
      model,
      data: createUserDto
    });

    if (userResult.isFailure) return Result.fail(userResult.getError());

    const user = userResult.getValue() as unknown as IUser;

    await userRepository.create(user);

    return Result.ok(user);
  }
}
