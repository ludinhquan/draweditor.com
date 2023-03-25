import {EntityData, Result, UUIDEntityId} from "@draweditor.com/core";
import {PrismaClient} from "@prisma/client";
import { FindManyArgs, FindManyResult, IRepository } from "../../IRepository";

export class ThingRepository implements IRepository {
  constructor(private prismaClient: PrismaClient){}

  findById(entityData: EntityData): Promise<Result<EntityData>> {
    throw new Error('Please implements findById method')
  }

  findMany(args: FindManyArgs): Promise<FindManyResult> {
    throw new Error('Please implements findMany method')
  }

  async create(entityData: EntityData): Promise<Result<any>> {
    const {data, model} = entityData;
    
    const newData = await this.prismaClient[model.key].create({data});
    return Result.ok(newData);
  }

  update(entityData: EntityData): Promise<Result<EntityData>> {
    throw new Error('Please implements update method')
  }

  deleteById(entityData: EntityData): Promise<Result<EntityData>> {
    throw new Error('Please implements deleteById method')
  }
}
