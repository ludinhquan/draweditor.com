import {CreateUserDto} from "./IUserDto"
import {CreateUserResponse} from "./IUserResponse"

export const UserService = Symbol('UserService')

export interface IUserService {
  create(createUserDto: CreateUserDto): Promise<CreateUserResponse>
  // createWithGoogle(): Promise<IUser>
}
