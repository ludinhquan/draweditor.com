import {NotFoundError, UnauthorizedError} from "@draweditor.com/core";

export namespace AuthenticationErrors {
  export class WrongCredentialProvided extends UnauthorizedError {}
  export class UserNotFound extends NotFoundError {}
}
