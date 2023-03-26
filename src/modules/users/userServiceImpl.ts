import {DomainModel, left, Result, right} from "@draweditor.com/core";
import {IDataSource} from "@draweditor.com/dataAccess";
import {IUser, User} from "./domain";
import {CreateUserDto, CreateUserResponse, IUserService, UserError} from "./interfaces";

export class UserServiceImpl implements IUserService {
  constructor(
    private dataSource: IDataSource,
    private domainModel: DomainModel
  ){}

  async getByEmail(email: string): Promise<IUser | null> {
    const userRepository = await this.dataSource.getRepository();
    const model = this.domainModel.getModel('user');

    const user = await userRepository.findDetail<IUser>({
      model,
      where: {email}
    });

    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<CreateUserResponse> {
    const userRepository = await this.dataSource.getRepository();
    const model = this.domainModel.getModel('user');

    const userResult = User.create({
      model,
      data: createUserDto
    });

    if (userResult.isFailure) 
      return left(new UserError.ValidationError(userResult.getError()));

    const user = userResult.getValue();

    const oldUser = await userRepository.findUnique(user);
    const existed = !!oldUser
    if (!!existed)
      return left(new UserError.UserAlreadyExists(`User with email ${createUserDto.email} already exists`))

    const data = await userRepository.create<User>(user);

    return right(Result.ok(data.getValue()));
  }
}
