import {AuthenticationModule, EmailModule, SmsModule, UserModule} from '@/modules';
import * as modelProps from '@/schemas';
import {Inject, Module, OnApplicationBootstrap, OnApplicationShutdown} from '@nestjs/common';
import {AppServiceImpl} from './appService';
import {CommonModule, DomainModelModule} from './common';
import {AppService, IAppService} from './IAppService';
import {PingController} from './pingController';

@Module({
  imports: [
    DomainModelModule.register(Object.values(modelProps)),
    CommonModule,
    EmailModule,
    SmsModule,
    UserModule,
    AuthenticationModule,
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
