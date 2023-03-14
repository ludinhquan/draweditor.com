import {BadRequestError, EntityDataProps, NotFoundError, ValidationError as ValidationErrorBase} from "@draweditor.com/core";

export namespace UseCaseErrors {
  export class ValidationError extends ValidationErrorBase {}

  export class SchemaNotFound extends NotFoundError {
    constructor(tenantId: string, model: string){
      super(`Can't find model schema ${model} in tenant by id ${tenantId}`)
    }
  }

  export class ResourceNotFound extends NotFoundError {}

  export class ResourceAlreadyExist extends BadRequestError {
    constructor(data: Partial<EntityDataProps>[]) {
      super(`Resource already exist`, data);
    }
  }
}
