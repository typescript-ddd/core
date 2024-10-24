import {
  DomainEvent,
  DomainEventSubscriber,
  DomainEventSubscriberManager,
  EntityId,
  Uuid,
} from "../../..";

describe("DomainEventSubscriberManager", () => {
  const id = Uuid.create().value;

  class TestId extends EntityId {
    public static create(): TestId {
      return new TestId(Uuid.create().value);
    }
    public static from(id: string): TestId {
      return new TestId(id);
    }
  }

  class TestDomainEvent extends DomainEvent {
    public constructor(public readonly id: string) {
      super(TestId.from(id), "test/event");
    }
  }

  const subscriber1: DomainEventSubscriber<TestDomainEvent> = {
    on: jest.fn(),
  };

  const subscriber2: DomainEventSubscriber<TestDomainEvent> = {
    on: jest.fn(),
  };

  let manager: DomainEventSubscriberManager;

  beforeEach(() => {
    manager = new DomainEventSubscriberManager();
  });

  it("Should subscribe to a given event", () => {
    const event = new TestDomainEvent(id);
    manager.subscribe(TestDomainEvent, subscriber1);
    manager.subscribe(TestDomainEvent, subscriber2);

    const subscribers = manager.getSubscribers(event);

    expect(subscribers).toHaveLength(2);
    expect(subscribers).toContain(subscriber1);
    expect(subscribers).toContain(subscriber2);
  });

  it("Should not subscribe to the same event twice", () => {
    const event = new TestDomainEvent(id);
    manager.subscribe(TestDomainEvent, subscriber1);
    manager.subscribe(TestDomainEvent, subscriber1);

    const subscribers = manager.getSubscribers(event);

    expect(subscribers).toHaveLength(1);
    expect(subscribers).toContain(subscriber1);
  });

  it("Should unsubscribe from a given event", () => {
    const event = new TestDomainEvent(id);
    manager.subscribe(TestDomainEvent, subscriber1);
    manager.subscribe(TestDomainEvent, subscriber2);

    let subscribers = manager.getSubscribers(event);
    expect(subscribers).toHaveLength(2);

    manager.unsubscribe(TestDomainEvent, subscriber1);
    subscribers = manager.getSubscribers(event);

    expect(subscribers).toHaveLength(1);
    expect(subscribers).toContain(subscriber2);
  });
});
