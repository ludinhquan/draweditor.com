import {BadRequestError, CustomError, HttpError, UnauthorizedError} from '@draweditor.com/core';
import {NestLogger} from '@draweditor.com/logger';
import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  UnauthorizedException
} from '@nestjs/common';
import {Response} from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private logger = new NestLogger(this.constructor.name);

  formatMessage(e: unknown) {
    return JSON.stringify(e);
  }

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const res = exception.getResponse() as { message: string };

    let error: CustomError =
      res instanceof CustomError
        ? res
        : new HttpError(exception.message, exception.getStatus());

    if (exception instanceof BadRequestException) {
      error = new BadRequestError(res.message);
    }

    if (exception instanceof UnauthorizedException) {
      error = new UnauthorizedError(res.message);
    }

    res instanceof CustomError
      ? this.logger.error(this.formatMessage(res))
      : this.logger.error(this.formatMessage(exception.message));

    response.status(error.statusCode).json(error.toJson());
  }
}
