export abstract class ValueObject<T extends Record<string, unknown>> {
  protected readonly props: T;

  constructor(props: T) {
    this.props = Object.freeze(props);
  }

  equals(vo?: ValueObject<T>): boolean {
    if (vo === null || vo === undefined) {
      return false;
    }

    if (vo.props === undefined) {
      return false;
    }

    if (vo.constructor.name !== this.constructor.name) {
      return false;
    }

    return JSON.stringify(this.props) === JSON.stringify(vo.props);
  }

  toString(): string {
    return JSON.stringify(this.props);
  }
}
