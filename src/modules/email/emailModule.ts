import {Module} from "@nestjs/common";
import {EmailService} from "./emailService";
import {EmailServiceImpl} from "./emailServiceImpl";

@Module({
  providers: [
    {provide: EmailService, useClass: EmailServiceImpl}
  ]
})
export class EmailModule {}
