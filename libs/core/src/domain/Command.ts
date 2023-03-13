type CommandProps<T> = {
  tenantId: string
  aggregateId: string
  correlationId: string
  causationId: string
  data: T
}

export class Command<T> {
  public readonly tenantId: string;

  /**
   * Command id, in case if we want to save it
   * for auditing purposes and create a correlation/causation chain
   */
  public readonly aggregateId: string;

  /** ID for correlation purposes (for UnitOfWork, for commands that
   *  arrive from other microservices,logs correlation etc). */
  public readonly correlationId: string;

  /**
   * Causation id to reconstruct execution ordering if needed
   */
  public readonly causationId?: string;

  constructor(props: CommandProps<T>) {
    this.tenantId = props.tenantId;
    this.aggregateId = props.aggregateId;
    this.correlationId = props.correlationId;
    this.causationId = props.causationId;
  }
}
