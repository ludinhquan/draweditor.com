import {NestFactory} from '@nestjs/core';
import {AppModule} from './appModule';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableShutdownHooks()

  await app.listen(3000);
}

bootstrap();
