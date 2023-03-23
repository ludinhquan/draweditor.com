import {EntityDataProps, NotFoundError, BadRequestError, ConflictError} from "@draweditor.com/core";

export namespace UseCaseErrors {
  export class BadRequest extends BadRequestError {}

  export class SchemaNotFound extends NotFoundError {
    
    constructor(tenantId: string, model: string){
      super(`Can't find model schema ${model} in tenant by id ${tenantId}`)
    }
  }

  export class ResourceNotFound extends NotFoundError {}

  export class ResourceAlreadyExist extends ConflictError {
    constructor(data: Partial<EntityDataProps>[]) {
      super(`Resource already exist`, data);
    }
  }
}

