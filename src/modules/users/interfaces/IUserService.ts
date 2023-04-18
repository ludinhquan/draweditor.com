import {Result} from "@draweditor.com/core"
import {IUser} from "../domain"
import {CreateUserDto} from "./IUserDto"
import {CreateUserResponse} from "./IUserResponse"

export const UserService = Symbol('UserService')

export interface IUserService {
  getById(id: string): Promise<IUser>
  getByEmail(email: string): Promise<IUser>
  getByPhoneNumber(phoneNumber: string): Promise<Result<IUser>>
  create(createUserDto: CreateUserDto): Promise<CreateUserResponse>
}
