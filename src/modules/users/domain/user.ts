import {EntityData, Result} from "@draweditor.com/core"

export interface IUser {
  id: string
  name: string
  email: string
  password: string
}

export type UserProp = Partial<IUser>

export class User {
  public readonly data: EntityData<IUser>

  private constructor() {}

  static create(prop: UserProp, id?: string): Result<User> {
    // return EntityData.create({
    //   // model: 
    //   data: prop
    // })

    return Result.ok()
  }
}
