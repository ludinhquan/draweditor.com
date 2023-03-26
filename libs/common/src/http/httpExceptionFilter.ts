import {CustomError} from '@draweditor.com/core';
import {NestLogger} from '@draweditor.com/logger';
import {
  ArgumentsHost, Catch,
  ExceptionFilter
} from '@nestjs/common';
import {Response} from 'express';

@Catch(CustomError)
export class HttpExceptionFilter implements ExceptionFilter {
  private logger = new NestLogger(this.constructor.name);

  formatMessage(e: unknown) {
    return JSON.stringify(e);
  }

  catch(exception: CustomError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    this.logger.error(this.formatMessage(exception));

    response.status(exception.statusCode).json(exception.toJson());
  }
}
