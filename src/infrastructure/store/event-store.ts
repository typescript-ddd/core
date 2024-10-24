import { DomainEvent, EntityId } from "../../domain";

export interface EventStore {
  saveEvents(
    aggregateId: EntityId,
    events: DomainEvent[],
    version: number
  ): Promise<void>;
  getEventsForAggregate(aggregateId: EntityId): Promise<DomainEvent[]>;
}
