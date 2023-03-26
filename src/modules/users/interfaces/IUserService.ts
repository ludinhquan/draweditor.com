import {IUser} from "../domain"
import {CreateUserDto} from "./IUserDto"
import {CreateUserResponse} from "./IUserResponse"

export const UserService = Symbol('UserService')

export interface IUserService {
  getByEmail(email: string): Promise<IUser>
  create(createUserDto: CreateUserDto): Promise<CreateUserResponse>
  // createWithGoogle(): Promise<IUser>
}
