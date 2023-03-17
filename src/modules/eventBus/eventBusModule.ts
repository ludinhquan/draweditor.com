import {EventBus, RabbitMQEventBus} from "@draweditor.com/eventBus";
import {ILogger, Logger} from "@draweditor.com/logger";
import {Module} from "@nestjs/common";

@Module({
  providers: [
    {
      provide: EventBus,
      useFactory(logger: ILogger) {
        return new RabbitMQEventBus('', logger)
      },
      inject: [Logger]
    }
  ],
  exports: [EventBus]
})
export class EventBusModule {}
