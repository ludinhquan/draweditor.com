import {Either, InternalServerError, IUseCase, Result, right} from "@draweditor.com/core";
import {IDataSource} from "@draweditor.com/dataAccess";
import {IEventBus} from "@draweditor.com/eventBus";
import {UseCaseErrors} from "../useCaseError";

export type CreateResponse = Either<
  UseCaseErrors.SchemaNotFound |
  UseCaseErrors.BadRequest |
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
    private eventBus: IEventBus,
    private dataSource: IDataSource
  ) {}

  async execute(command: CreateCommand): Promise<CreateResponse> {
    const repository = await this.dataSource.getRepository();

    // this.repository.findById();
    return right(Result.ok())
  }
}
