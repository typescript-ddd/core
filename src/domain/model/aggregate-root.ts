import { DomainEvent } from "../bus/event";
import { Entity } from "./entity";
import { EntityId } from "./entity-id";

export abstract class AggregateRoot<TId extends EntityId> extends Entity<TId> {
  private __version = -1;
  private __changes: DomainEvent[] = [];

  public getUncommittedEvents(): DomainEvent[] {
    return this.__changes;
  }

  public markChangesAsCommitted(): void {
    this.__changes = [];
  }

  public loadFromHistory(events: DomainEvent[]): void {
    for (const event of events) {
      this.applyChange(event);
      this.__version++;
    }
  }

  protected applyChange(event: DomainEvent): void {
    this.applyEvent(event, true);
  }

  private applyEvent(event: DomainEvent, isNew: boolean): void {
    const handler: Function = this.getEventHandler(event);
    handler && handler.call(this, event);
    if (isNew) {
      this.__changes.push(event);
    }
  }

  protected getEventHandler(event: DomainEvent): Function {
    return (this as any)[`apply${this.getEventName(event)}`];
  }

  protected getEventName(event: DomainEvent): string {
    const [, extractedEventName]: string[] = event.type.split("/");
    const chunks: string[] = extractedEventName.split("-");
    return chunks
      .map((chunk) => chunk.charAt(0).toUpperCase() + chunk.slice(1))
      .join("");
  }
}
