import {Result} from "@draweditor.com/core"
import {IUser} from "./domain"
import {CreateUserDto} from "./userDto"

export const UserService = Symbol('UserService')

export interface IUserService {
  getByEmail(email: string): Promise<IUser>
  getById(id: string): Promise<IUser>

  create(createUserDto: CreateUserDto): Promise<Result<IUser>>
  // createWithGoogle(): Promise<IUser>
}
