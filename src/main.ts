import {Logger} from '@draweditor.com/logger';
import {NestFactory} from '@nestjs/core';
import {AppModule} from './AppModule';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = await app.resolve(Logger);

  app.useLogger(logger);

  app.enableShutdownHooks()

  await app.listen(3000);
}

bootstrap();
