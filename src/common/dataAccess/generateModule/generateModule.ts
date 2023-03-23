import {Module} from "@nestjs/common";
import {ConsoleModule} from "nestjs-console";
import {GenerateConsole} from "./generateConsole";
import {PrismaService} from "./prismaService";

@Module({
  imports: [ConsoleModule],
  providers: [PrismaService, GenerateConsole]
})
export class GenerateModule {}
