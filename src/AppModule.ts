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
  ){}

  async onApplicationBootstrap() {
    await this.appService.register()
  }
  
  async onApplicationShutdown() {
    await this.appService.destroy()
  }
}
