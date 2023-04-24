import { v4 as uuidv4, validate } from 'uuid';
import {Result} from '../common';

// Define the UniqueEntityId interface
export interface UniqueEntityId {
  toString(): string;
  equals(id: UniqueEntityId): boolean;
}

// Define the UuidEntityId class as a concrete implementation of UniqueEntityId
export class UUIDEntityId implements UniqueEntityId {
  readonly #value: string;

  private constructor(id?: string) {
    this.#value = id ? id : uuidv4();
  }

  public toString(): string {
    return this.#value;
  }

  public static generate() {
    return uuidv4()
  }

  public equals(id: UniqueEntityId): boolean {
    if (!(id instanceof UUIDEntityId)) {
      return false;
    }

    return id.#value === this.#value;
  }

  static create(id?: string): Result<UniqueEntityId> {
    if (!id) return Result.ok(new UUIDEntityId());

    if (id && validate(id)) return Result.ok(new UUIDEntityId(id));

    return Result.fail(`Invalid uuid ${id}`);
  }
}
