import {Logger, NestLogger} from "@draweditor.com/logger";
import {Module} from "@nestjs/common";

@Module({
  providers: [
    {provide: Logger, useClass: NestLogger}
  ],
  exports: [Logger]
})
export class LoggerModule {}
