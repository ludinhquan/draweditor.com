import {BadRequestError, ConflictError} from "@draweditor.com/core";

export namespace UserError {
  export class ValidationError extends BadRequestError {}
  export class UserAlreadyExists extends ConflictError {}
}
