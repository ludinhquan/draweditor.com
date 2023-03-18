import {EntityData, Result} from "@draweditor.com/core";
import { FindManyArgs, FindManyResult, IRepository } from "../../IRepository";

export class ThingRepository implements IRepository {
  constructor(){}

  findById(entityData: EntityData): Promise<Result<EntityData>> {
    throw new Error('Please implements findById method')
  }

  findMany(args: FindManyArgs): Promise<FindManyResult> {
    throw new Error('Please implements findMany method')
  }

  create(entityData: EntityData): Promise<Result<EntityData>> {
    throw new Error('Please implements create method')
  }

  update(entityData: EntityData): Promise<Result<EntityData>> {
    throw new Error('Please implements update method')
  }

  deleteById(entityData: EntityData): Promise<Result<EntityData>> {
    throw new Error('Please implements deleteById method')
  }
}
