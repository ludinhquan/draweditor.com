export const AppService = Symbol('AppService')

export interface IAppService {
  registerSchemas(): void
}
