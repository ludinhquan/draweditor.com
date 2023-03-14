import { CustomError } from './custom.error';

export class HttpError extends CustomError {
  public statusCode = 500;
  public message = 'An unknown error occurred';

  constructor(message?: string, statusCode?: number) {
    super(message);
    this.statusCode = statusCode ?? this.statusCode;
    this.message = message ?? this.message;

    Object.setPrototypeOf(this, HttpError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
