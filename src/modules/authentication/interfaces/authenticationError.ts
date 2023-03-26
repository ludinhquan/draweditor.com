import {UnauthorizedError} from "@draweditor.com/core";

export namespace AuthenticationErrors {
  export class WrongCredentialProvided extends UnauthorizedError {}
}
