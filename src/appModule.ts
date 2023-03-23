import {Inject, Module, OnApplicationBootstrap, OnApplicationShutdown} from '@nestjs/common';
import {AppServiceImpl} from './appService';
import {CommonModule} from './common';
import {AppService, IAppService} from './IAppService';
import {PingController} from './pingController';

@Module({
  imports: [
    {module: CommonModule}
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
