import {Inject, Module, OnApplicationBootstrap} from '@nestjs/common';
import {AppServiceImpl} from './AppServiceImpl';
import {AppService, IAppService} from './IAppService';
import {PingController} from './PingController';

@Module({
  controllers: [PingController],
  providers: [
    {
      provide: AppService,
      useClass: AppServiceImpl
    }
  ]
})
export class AppModule implements OnApplicationBootstrap{
  constructor(
    @Inject(AppService) private appService: IAppService
  ){}

  onApplicationBootstrap() {
    this.appService.registerSchemas()
  }
}
