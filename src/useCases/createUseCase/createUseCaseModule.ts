import {EventBus, IEventBus} from "@draweditor.com/eventBus";
import {Module} from "@nestjs/common";
import {CreateUseCase} from "./createUseCase";

@Module({
  providers: [
    {
      provide: CreateUseCase,
      useFactory(eventBus: IEventBus) {
        return new CreateUseCase(eventBus)
      },
      inject: [EventBus]
    }
  ]
})
export class CreateUseCaseModule {}
