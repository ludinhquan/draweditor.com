import {IUser} from "../domain"
import {CreateUserDto} from "./IUserDto"

export const UserService = Symbol('UserService')

export type TOtpDTO = {
  secret: string
  counter: number
  otpExpiredTime: Date
}

export interface IUserService {
  getById(id: string): Promise<IUser>
  getByEmail(email: string): Promise<IUser>
  getByPhoneNumber(phoneNumber: string): Promise<IUser>
  // createUser(createUserDto: CreateUserDto): Promise<CreateUserResponse>
  createUser(dto: CreateUserDto): Promise<IUser>
  setOtp(userId: string, otp: Partial<TOtpDTO>): Promise<boolean>
}
