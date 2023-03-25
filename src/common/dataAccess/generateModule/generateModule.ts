import {DomainModelModule} from "@/common/domainModel";
import * as modelProps from '@/schemas';
import {Module} from "@nestjs/common";
import {ConsoleModule} from "nestjs-console";
import {GenerateConsole} from "./generateConsole";
import {PrismaService} from "./prismaService";

@Module({
  imports: [
    ConsoleModule, 
    DomainModelModule.register(Object.values(modelProps))
  ],
  providers: [PrismaService, GenerateConsole]
})
export class GenerateModule {}
