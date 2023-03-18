import {Controller, Post} from "@nestjs/common";
import {CreateUseCase} from "./createUseCase";

@Controller()
export class CreateUseCaseController {
  constructor(
    private createUseCase: CreateUseCase
  ){}

  @Post()
  create() {
    // this.createUseCase.execute();
  }
}
