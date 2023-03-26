import {BadRequestError, ConflictError} from "@draweditor.com/core";

export namespace UserError {
  export class ValidationError extends BadRequestError {}
  export class UserAlreadyExisted extends ConflictError {}
}
