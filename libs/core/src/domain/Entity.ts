// Base Value Object

import {UniqueEntityId} from "./UniqueEntityId";

export abstract class Entity<T> {
  readonly id: UniqueEntityId;
  readonly props: T;

  constructor(props: T, id: UniqueEntityId) {
    this.id = id;
    this.props = Object.freeze(props)
  }
}
