import {Module} from "@nestjs/common";
import {CreateUseCase} from "./createUseCase";

@Module({
  providers: [
    {provide: CreateUseCase, useClass: CreateUseCase}
  ]
})
export class CreateUseCaseModule {}
