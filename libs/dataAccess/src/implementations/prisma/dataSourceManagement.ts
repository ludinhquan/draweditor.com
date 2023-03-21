import {mutex} from "@draweditor.com/core";
import {PrismaClient} from "@prisma/client";
import {IDataSource} from "../../IDataSource";
import {IRepository} from "../../IRepository";
import {ThingRepository} from "./thingRepository";

export class DataSourceManagement implements IDataSource {
  private prismaClient: PrismaClient
  private repository: IRepository

  @mutex()
  private async getPrismaClient(){
    if(this.prismaClient) return this.prismaClient;

    this.prismaClient = new PrismaClient({})
    await this.prismaClient.$connect();

    return this.prismaClient;
  }

  @mutex()
  public async getRepository(): Promise<IRepository> {
    if (this.repository) return this.repository;

    const prismaClient = await this.getPrismaClient();
    this.repository = new ThingRepository(prismaClient)

    return this.repository;
  }
}
