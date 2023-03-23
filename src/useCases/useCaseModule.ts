import {Module} from "@nestjs/common";

const useCaseModule = []

const exportUseCases = []

@Module({
  imports: [...useCaseModule],
  providers: [...exportUseCases],
  exports: [...exportUseCases]
})
export class UseCaseModule {}
