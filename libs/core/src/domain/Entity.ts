// Base Value Object

import {UniqueEntityId} from "./UniqueEntityId";
import {ValueObject} from "./ValueObject";

// @ts-ignore
export abstract class Entity<T> extends ValueObject<T> {
  readonly id: UniqueEntityId;
  readonly props: T;

  constructor(props: T, id: UniqueEntityId) {
    super(props)
    this.id = id;
    this.props = Object.freeze(props)
  }
}
