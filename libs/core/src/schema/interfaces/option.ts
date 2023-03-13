export enum AttributeType  {
  String = 'string',
  Number = 'number',
  Date = 'date',
  Boolean = 'boolean',
  Object = 'object',
  Array = 'array',
  Relation = 'relation'
}

type BaseOptions<T extends AttributeType> = {
  type: T;
  required: boolean;
};

export type ValidationOptions = Exclude<
  | StringOptions
  | NumberOptions
  | DateOptions
  | BooleanOptions
  | ObjectOptions
  | ArrayOptions,
  []
>;

export type ValidationKeys<T extends ValidationOptions> = Exclude<keyof T, 'default'>
export type ValidateFunction = (value: unknown, key?: string) => boolean;
export type ValidationError = string | ((value: unknown, key: string) => string)

// @ts-ignore
export type ValidationResult = string[] | Record<string, ValidationResult>

export type StringOptions = BaseOptions<AttributeType.String> & {
  pattern: string
  enum: (string | number)[]
};

export type NumberOptions = BaseOptions<AttributeType.Number> & {
  min: number;
  max: number;
  range: [number, number];
};

export type BooleanOptions = BaseOptions<AttributeType.Boolean>

export type DateOptions = BaseOptions<AttributeType.Date>

export type ObjectOptions = BaseOptions<AttributeType.Object>

export type ArrayOptions = BaseOptions<AttributeType.Array>
