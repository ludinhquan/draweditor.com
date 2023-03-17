import {Result} from "@draweditor.com/core";
import {IntegrationEvent} from "./IntegrationEvent";

export interface IEventHandler<Event extends IntegrationEvent> {
  handle(event: Event, raw: any): Promise<Result<any>>
}
