import {EntityData, Result} from "@draweditor.com/core";
import {PrismaClient} from "@prisma/client";
import {FindManyArgs, FindManyResult, IRepository} from "../../IRepository";

export class ThingRepository implements IRepository {
  constructor(private prismaClient: PrismaClient){}

  async findUnique<T extends EntityData>(entityData: T): Promise<T['data']> {
    const {uniqueData, model} = entityData;

    const findResult = await this.prismaClient[model.key].findFirst({
      where: {
        id: {not: {equals: entityData.id.toString()}},
        OR: uniqueData
      }
    });

    return findResult
  }

  findById(entityData: EntityData): Promise<Result<EntityData>> {
    throw new Error('Please implements findById method')
  }

  findMany(args: FindManyArgs): Promise<FindManyResult> {
    throw new Error('Please implements findMany method')
  }

  async create<T extends EntityData>(entityData: T): Promise<Result<T['data']>> {
    const {data, model} = entityData;
    
    await this.prismaClient[model.key].create({data});
    return Result.ok(data);
  }

  update(entityData: EntityData): Promise<Result<EntityData>> {
    throw new Error('Please implements update method')
  }

  deleteById(entityData: EntityData): Promise<Result<EntityData>> {
    throw new Error('Please implements deleteById method')
  }
}
