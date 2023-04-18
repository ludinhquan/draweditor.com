import {DomainModel, left, Result, right} from "@draweditor.com/core";
import {IDataSource} from "@draweditor.com/dataAccess";
import {IUser, User} from "./domain";
import {CreateUserDto, CreateUserResponse, IUserService, UserError} from "./interfaces";

export class UserServiceImpl implements IUserService {
  constructor(
    private dataSource: IDataSource,
    private domainModel: DomainModel
  ){}

  async getById(id: string): Promise<IUser> {
    const userRepository = await this.dataSource.getRepository();
    const model = this.domainModel.getModel('user');

    const user = await userRepository.findDetail<IUser>({
      model,
      where: {id}
    });

    return user;
  }

  async getByPhoneNumber(phoneNumber: string): Promise<Result<IUser>> {
    const userRepository = await this.dataSource.getRepository();
    const model = this.domainModel.getModel('user');

    const user = await userRepository.findDetail<IUser>({
      model,
      where: {phoneNumber}
    });

    if (!user) return Result.fail(`Can't find user by phone number ${phoneNumber}`);

    return Result.ok(user);
  }

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
      return left(new UserError.UserAlreadyExists(`User with phone number ${createUserDto.phoneNumber} already exists`))

    const data = await userRepository.create<User>(user);

    return right(Result.ok(data.getValue()));
  }
}
