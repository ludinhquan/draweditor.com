export abstract class IntegrationEvent<T = unknown> {
  public readonly organizationId: string;

  /** Aggregate ID where domain event occurred */
  public readonly aggregateId: string;

  /** ID for correlation purposes (for UnitOfWork, Integration Events, logs correlation etc).
   * This ID is set automatically in a publisher.
   */
  public readonly correlationId: string;

  /** Date when this domain event occurred */
  public readonly dateOccurred: Date;

  public readonly data: T

  constructor(props: IntegrationEvent<T>) {
    if (!props.organizationId) throw new Error("Missing organizationId");
    if (!props.aggregateId) throw new Error("Missing aggregateId");
    if (!props.data) throw new Error("Missing data");

    this.organizationId = props.organizationId;
    this.aggregateId = props.aggregateId;
    this.correlationId = props.correlationId;
    this.dateOccurred = new Date();
    this.data = props.data;
  }

  public toString(): string {
    return JSON.stringify({
      organizationId: this.organizationId,
      aggregateId: this.aggregateId,
      correlationId: this.correlationId,
      dateOccurred: this.dateOccurred,
      data: this.data,
    });
  }
}
