import {DataModel, EntityData, Result} from "@draweditor.com/core";

export const Repository = Symbol("Repository")

type Pagination = {
  take: number;
  skip: number;
  cursor?: string;
}

type Include = Record<string, {include?: Include, select?: Include} | boolean>;

export type FindManyArgs = {
  model: DataModel
  include?: Include
  pagination?: Pagination
  // where?: DeepPartial<WhereConditions>
}

export type FindDetailArgs = {
  model: DataModel
  where: {id: string}
  include?: Include
}

export type FindManyResult = {
  data: EntityData['data'][],
  pagination?: Pagination & {total: number}
}

export interface IRepository {
  findById(entityData: EntityData): Promise<Result<EntityData>>

  findMany(args: FindManyArgs): Promise<FindManyResult>

  create(entityData: EntityData): Promise<Result<EntityData>>

  update(entityData: EntityData): Promise<Result<EntityData>>

  deleteById(entityData: EntityData): Promise<Result<EntityData>>
}
