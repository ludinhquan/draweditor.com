import {Either, Result} from "@draweditor.com/core";
import { AuthenticationErrors } from "./authenticationError";


export type AuthenticationResponse = Either<
  AuthenticationErrors.WrongCredentialProvied,
  Result<void>
>
