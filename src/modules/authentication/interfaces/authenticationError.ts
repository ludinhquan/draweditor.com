import {UnauthorizedError} from "@draweditor.com/core";

export namespace AuthenticationErrors {
  export class WrongCredentialProvied extends UnauthorizedError {}
}
