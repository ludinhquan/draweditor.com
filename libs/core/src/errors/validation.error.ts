
import { CustomError } from './custom.error';

export class ValidationError extends CustomError {
  statusCode = 422;

  constructor(public data?: any) {
    super('Validation Error');

    Object.setPrototypeOf(this, ValidationError.prototype);
  }

  serializeErrors() {
    return [{message: this.message, metadata: this.data}];
  }
}
