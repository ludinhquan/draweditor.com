import {PrismaClient} from "@prisma/client";
import {IRepository} from "./IRepository";

export const DataSource = Symbol('DataSource')

type DataSourceIdentity = unknown;

export interface IDataSource {
  getRepository(identify?: DataSourceIdentity): Promise<IRepository>
  getClient(identify?: DataSourceIdentity): Promise<PrismaClient>
}
