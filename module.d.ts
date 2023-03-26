import {IUser} from "@/modules"

export {}

declare global {
  const isDevelopment

  namespace Express {
    interface User extends IUser {
      id: string,
      name: string
    }
  }
}
