import {Either, InternalServerError, Result} from "@draweditor.com/core";
import {IUser} from "../domain";
import {UserError} from "./IUserError";

export type CreateUserResponse = Either<
  UserError.ValidationError |
  UserError.UserAlreadyExists |
  InternalServerError,
  Result<Partial<IUser>>
>
