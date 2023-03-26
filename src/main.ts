import {HttpExceptionFilter, HttpInterceptor} from '@draweditor.com/common';
import {NestFactory} from '@nestjs/core';
import {AppModule} from './appModule';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalInterceptors(new HttpInterceptor())

  app.enableShutdownHooks()

  await app.listen(3000);
}

bootstrap();
