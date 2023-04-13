import {Module} from "@nestjs/common";
import {SmsController} from "./smsController";
import {SmsService} from "./smsService";

@Module({
  providers: [SmsService],
  controllers: [SmsController]
})
export class SmsModule {}
