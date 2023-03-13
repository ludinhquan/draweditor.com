import { isEmpty } from "./lodash";

export class Result<T> {
  private readonly _isSuccess: boolean;
  private readonly _isFailure: boolean;
  private readonly error: T | string;
  private readonly value: T;

  public constructor(isSuccess: boolean, error?: T | string, value?: T) {
    if (isSuccess && error) {
      throw new Error(
        'InvalidOperation: A result cannot be successful and contain an error',
      );
    }
    if (!isSuccess && !error) {
      throw new Error(
        'InvalidOperation: A failing result needs to contain an error message',
      );
    }

    this._isSuccess = isSuccess;
    this._isFailure = !isSuccess;
    this.error = error;
    this.value = value;

    Object.freeze(this);
  }

  get isSuccess() {
    return this._isSuccess;
  }

  get isFailure() {
    return this._isFailure;
  }

  public getValue(): T {
    if (!this._isSuccess) {
      throw new Error(
        "Can't get the value of an error result. Use 'errorValue' instead.",
      );
    }

    return this.value;
  }
  
  public getError<K = T>(): K {
    return this.error as K;
  }

  public static ok<U>(value?: U): Result<U> {
    return new Result<U>(true, null, value);
  }

  public static fail<U>(error: string | any): Result<U> {
    return new Result<U>(false, error);
  }

  public static combine<T = any>(results: Result<T>[]): Result<T[]> {
    const data: T[] = []
    for (const result of results) {
      if (result.isFailure) return result as unknown as Result<T[]>;
      data.push(result.getValue())
    }
    return Result.ok(data);
  }

  public static combines<T = any>(results: Result<T>[]): Result<T> {
    const errors: Record<number, Result<T>> = {};

    for (const [index, result] of results.entries()) {
      if (result.isFailure) errors[index] = result.getError();
    }

    if (!isEmpty(errors)) return Result.fail(errors);

    return Result.ok();
  }
}

export type Either<L, A> = Left<L, A> | Right<L, A>;

export class Left<L, A> {
  readonly value: L;

  constructor(value: L) {
    this.value = value;
  }

  isLeft(): this is Left<L, A> {
    return true;
  }

  isRight(): this is Right<L, A> {
    return false;
  }
}

export class Right<L, A> {
  readonly value: A;

  constructor(value: A) {
    this.value = value;
  }

  isLeft(): this is Left<L, A> {
    return false;
  }

  isRight(): this is Right<L, A> {
    return true;
  }
}

export const left = <L, A>(l: L): Either<L, A> => {
  return new Left(l);
};

export const right = <L, A>(a: A): Either<L, A> => {
  return new Right<L, A>(a);
};
