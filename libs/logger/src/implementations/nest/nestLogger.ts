import {ConsoleLogger} from "@nestjs/common";
import {ILogger} from "../../ILogger";

export class NestLogger extends ConsoleLogger implements ILogger {}
