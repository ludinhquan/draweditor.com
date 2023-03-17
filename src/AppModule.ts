import {EventBus, IEventBus} from '@draweditor.com/eventBus';
import {Inject, Module, OnApplicationBootstrap, OnApplicationShutdown} from '@nestjs/common';
import {AppServiceImpl} from './AppServiceImpl';
import {AppService, IAppService} from './IAppService';
import {EventBusModule, LoggerModule} from './modules';
import {PingController} from './PingController';

@Module({
  imports: [
    {module: EventBusModule, global: true},
    {module: LoggerModule, global: true}
  ],
  controllers: [PingController],
  providers: [
    {
      provide: AppService,
      useClass: AppServiceImpl
    }
  ]
})
export class AppModule implements OnApplicationBootstrap, OnApplicationShutdown {
  constructor(
    @Inject(AppService) private appService: IAppService,
    @Inject(EventBus) private eventBus: IEventBus
  ){}

  async onApplicationBootstrap() {
    this.appService.registerSchemas()
  }
  
  async onApplicationShutdown() {
    await this.eventBus.destroy()
  }
}
