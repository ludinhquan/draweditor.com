import {Module} from "@nestjs/common";
import {ConfigModule} from "@nestjs/config";
import {DataAccessModule} from "./dataAccess";
import {EventBusModule} from "./eventBus";
import {LoggerModule} from "./logger";

@Module({
  imports: [
    {module: DataAccessModule, global: true},
    {module: EventBusModule, global: true},
    {module: LoggerModule, global: true},
    ConfigModule.forRoot({envFilePath: '.env', isGlobal: true}),
  ],
})
export class CommonModule {}
