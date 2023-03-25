import {DomainModel} from "@draweditor.com/core";
import {Command, Console} from "nestjs-console";
import {PrismaService} from "./prismaService";

@Console({command: 'generate'})
export class GenerateConsole {
  constructor(
    private prismaService: PrismaService,
    private domainModel: DomainModel,
  ){}

  @Command({command: 'client'})
  async generateClient() {
    const models = this.domainModel.models;
    const schema = await this.prismaService.generateClient(models);

    console.debug(schema);
  }
}
