import {EntityData} from "@draweditor.com/core"

export interface IUser {
  id: string
  name: string
  email: string
  password: string
}

export type UserProp = Partial<IUser>

export class User extends EntityData<UserProp> {
  private isAdmin: boolean

  markIsAdmin() {
    this.isAdmin = true
  }
}

