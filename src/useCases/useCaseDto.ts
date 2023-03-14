export interface BaseParamDTO {
  domain: string
  model: string
}

export interface BaseParamWithIDDTO extends BaseParamDTO {
  id: string
}

export interface ICreateDTO {}

export interface IDeleteDTO {}

export interface IFindDetailDTO {
  include: string
}

export interface IFindDTO {
  include: string
  take: number,
  skip: number,
  cursor: string,
}
