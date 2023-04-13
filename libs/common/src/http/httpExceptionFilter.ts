import {CustomError, HttpError, UnauthorizedError} from '@draweditor.com/core';
import {NestLogger} from '@draweditor.com/logger';
import {
  ArgumentsHost, Catch,
  ExceptionFilter,
  HttpException,
  UnauthorizedException
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

    let error: CustomError;
    switch (true) {
      case exception instanceof UnauthorizedException:
        error = new UnauthorizedError(exception.message)
        break;
      default:
        this.logger.warn(`Please implements error for ${exception.name}`)
        error = new HttpError(exception.message, (exception as HttpException).getStatus());
    }

    this.logger.error(this.formatMessage(error.toJson()));

    response.status(error.statusCode).json(error.toJson());
  }
}
