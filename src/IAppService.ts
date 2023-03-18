export const AppService = Symbol('AppService')

export interface IAppService {
  register(): Promise<void>
  destroy(): Promise<void>
}
