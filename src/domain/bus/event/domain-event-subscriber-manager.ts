import { DomainEvent } from "./domain-event";
import { DomainEventSubscriber } from "./domain-event-subscriber";

export type DomainEventClass<T extends DomainEvent> = new (
  ...args: any[]
) => T;

export class DomainEventSubscriberManager {
  private readonly subscribers: Map<
    string,
    DomainEventSubscriber<DomainEvent>[]
  > = new Map();

  subscribe<T extends DomainEvent>(
    event: DomainEventClass<T>,
    subscriber: DomainEventSubscriber<T>
  ) {
    const eventName = event.name;
    const subscribers = this.subscribers.get(eventName) || [];
    if (subscribers.includes(subscriber)) {
      return;
    }
    subscribers.push(subscriber);
    this.subscribers.set(eventName, subscribers);
  }

  unsubscribe<T extends DomainEvent>(
    event: DomainEventClass<T>,
    subscriber: DomainEventSubscriber<T>
  ) {
    const subscribers = this.subscribers.get(event.name) || [];
    this.subscribers.set(
      event.name,
      subscribers.filter((s) => s !== subscriber)
    );
  }

  getSubscribers<T extends DomainEvent>(
    event: T
  ): DomainEventSubscriber<T>[] {
    return this.subscribers.get(event.constructor.name) || [];
  }
}
