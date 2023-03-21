import {DataSource, IDataSource} from "@draweditor.com/dataAccess";
import {EventBus, IEventBus} from "@draweditor.com/eventBus";
import {Module} from "@nestjs/common";
import {CreateUseCase} from "./createUseCase";

@Module({
  providers: [
    {
      provide: CreateUseCase,
      useFactory(eventBus: IEventBus, dataSource: IDataSource) {
        return new CreateUseCase(eventBus, dataSource)
      },
      inject: [EventBus, DataSource]
    }
  ]
})
export class CreateUseCaseModule {}
