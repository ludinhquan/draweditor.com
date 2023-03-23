import {DomainModel} from "@draweditor.com/core";
import {Command, Console} from "nestjs-console";
import * as schemas from '../../../schemas';
import {PrismaService} from "./prismaService";

@Console({command: 'generate'})
export class GenerateConsole {
  constructor(
    private prismaService: PrismaService
  ){}

  @Command({command: 'client'})
  async generateClient() {
    const modelResult = DomainModel.create(Object.values(schemas));
    if (modelResult.isFailure) throw new Error(modelResult.getError());

    const models = modelResult.getValue();
    const schema = await this.prismaService.generateSchema(models);

    console.log(schema);
  }
}
