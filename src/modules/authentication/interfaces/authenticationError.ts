import {NotFoundError, UnauthorizedError} from "@draweditor.com/core";

export namespace AuthenticationErrors {
  export class WrongCredentialProvided extends UnauthorizedError {}

  export class UserNotFound extends NotFoundError {
    constructor(userId: string) {
      super(`User with id ${userId} does not exist`)
    }
  }
  export class UserProfileNotSetup extends UnauthorizedError {
    constructor(){
      super('Your profile is not set up. Please set up your profile to continue.')
    }
  }
}
