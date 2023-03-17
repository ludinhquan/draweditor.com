export const Logger = Symbol('Logger')

export interface ILogger {
  log(message: string, context?: string): void
  debug(message: string, context?: string): void
  warn(message: string, context?: string): void
  error(message: string, stack?: string, context?: string): void
}
