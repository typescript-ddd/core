import { EntityId, UtcDate } from "../../model";

export abstract class DomainEvent<T = any> {
  public readonly occurredOn: UtcDate = UtcDate.now();

  protected constructor(
    public readonly aggregateId: EntityId,
    public readonly type: string,
    public readonly payload?: T
  ) {}
}
