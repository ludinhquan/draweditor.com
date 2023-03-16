import {IEventHandler} from "./IHandler"
import {IntegrationEvent} from "./IntegrationEvent"

export const EventBus = Symbol('EventBus')

export interface IEventBus {
  publish(event: IntegrationEvent): Promise<void>
  subscribe(event: IntegrationEvent, handler: IEventHandler<IntegrationEvent>): Promise<void>
  destroy(): Promise<void>
}
