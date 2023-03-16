import {IEventHandler, IntegrationEvent, IEventBus} from "@draweditor.com/event-bus";
import * as rabbitmq from 'amqplib'

export class RabbitMQEventBus implements IEventBus {
  private connection: rabbitmq.Connection;

  constructor(private url: string) {}

  private async getConnection() {
    console.log('connect')
    if (this.connection) return this.connection;
    console.log('real connect')
    this.connection = await rabbitmq.connect(this.url);
  }

  public async subscribe(event: IntegrationEvent<unknown>, handler: IEventHandler<IntegrationEvent<unknown>>): Promise<void> {
    const connection = await this.getConnection();
  }

  public async publish(event: IntegrationEvent<unknown>): Promise<void> {
    const connection = await this.getConnection();
  }

  public async destroy(): Promise<void> {
    await this.connection.close()
  }
}
