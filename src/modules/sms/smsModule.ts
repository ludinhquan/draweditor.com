import {Module} from "@nestjs/common";
import {SmsService} from "./ISmsService";
import {TwilioSmsService} from "./smsService";

@Module({
  providers: [
    {
      provide: SmsService,
      useClass: TwilioSmsService
    }
  ],
  exports: [SmsService]
})
export class SmsModule {}
