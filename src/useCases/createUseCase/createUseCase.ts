import {Either, InternalServerError, IUseCase, Result, right} from "@draweditor.com/core";
import {IEventBus} from "@draweditor.com/eventBus";
import {UseCaseErrors} from "../useCaseError";

export type CreateResponse = Either<
  UseCaseErrors.SchemaNotFound |
  UseCaseErrors.ValidationError |
  UseCaseErrors.ResourceAlreadyExist |
  InternalServerError,
  Result<{id: string}>
>

export type CreateCommand = {
  model: string,
  data: object
}

export class CreateUseCase implements IUseCase<CreateCommand, CreateResponse> {
  constructor(
    private eventBus: IEventBus
  ) {}

  async execute(command: CreateCommand): Promise<CreateResponse> {
    return right(Result.ok())
  }
}
