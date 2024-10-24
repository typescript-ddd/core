import {
  DomainEvent,
  DomainEventBus,
  DomainEventSubscriberManager,
} from "../../../domain/bus/event";

export class DefaultEventBus implements DomainEventBus {
  constructor(private readonly manager: DomainEventSubscriberManager) {}

  async publish<T extends DomainEvent>(...events: T[]): Promise<void> {
    events.forEach((event) => {
      const subscribers = this.manager.getSubscribers(event);
      subscribers.forEach((subscriber) => subscriber.on(event));
    });
  }
}
