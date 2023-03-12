import {Controller, Get} from "@nestjs/common";

@Controller('ping')
export class PingController {
  @Get()
  ping() {
    return 'Pong!'
  }

  @Get('devops')
  devOps() {
    return 'Devops Pong!'
  }
}
