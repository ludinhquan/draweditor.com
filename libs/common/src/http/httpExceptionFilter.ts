import {CustomError, HttpError} from '@draweditor.com/core';
import {NestLogger} from '@draweditor.com/logger';
import {
  ArgumentsHost, Catch,
  ExceptionFilter,
  HttpException
} from '@nestjs/common';
import {Response} from 'express';

@Catch(HttpException, CustomError)
export class HttpExceptionFilter implements ExceptionFilter {
  private logger = new NestLogger(this.constructor.name);

  formatMessage(e: unknown) {
    return JSON.stringify(e);
  }

  catch(exception: CustomError | HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    this.logger.error(this.formatMessage(exception));

    let error = exception as CustomError;
    if (exception instanceof HttpException) {
      error = new HttpError((exception as HttpException).message, exception.getStatus())
      this.logger.error(exception.message)
    }

    response.status(error.statusCode).json(error.toJson());
  }
}
