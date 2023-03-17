import {mutex} from "@draweditor.com/core";
import {IEventBus, IEventHandler, IntegrationEvent} from "@draweditor.com/eventBus";
import {ILogger} from "@draweditor.com/logger";
import * as rabbitmq from 'amqplib';

export class RabbitMQEventBus implements IEventBus {
  private connection: rabbitmq.Connection;
  private channel: rabbitmq.Channel;

  constructor(
    private url: string,
    private logger: ILogger
  ) {
    this.getConnection()
  }

  @mutex()
  private async getConnection() {
    if (this.connection) return this.connection;
    try {
      this.connection = await rabbitmq.connect(this.url);
      this.logger.log('RabbitMQ connect successfully!', this.constructor.name)
      return this.connection
    } catch (e) {
      this.logger.error(e.message, e.stack, this.constructor.name)
    }
  }

  @mutex()
  private async getChannel() {
    if (this.channel) return this.channel;
    const connection = await this.getConnection();
    this.channel = await connection.createChannel();
  }

  public async subscribe(event: IntegrationEvent<unknown>, handler: IEventHandler<IntegrationEvent<unknown>>): Promise<void> {
    const channel = await this.getChannel();

    // await this.channel.assertQueue(queueName);
  }

  public async publish(event: IntegrationEvent<unknown>): Promise<void> {
    const channel = await this.getChannel();
  }

  public async destroy(): Promise<void> {
    if (!this.channel) return;
    this.logger.warn('Destroy rabbitmq connection!')
    await this.channel.close()
    await this.connection.close()
  }
}
