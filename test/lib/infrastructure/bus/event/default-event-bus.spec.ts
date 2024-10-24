import {
  DomainEvent,
  DomainEventSubscriber,
  DomainEventSubscriberManager,
  EntityId,
  Uuid,
} from "@src/domain";
import { DefaultEventBus } from "@src/infrastructure";

describe("DefaultEventBus", () => {
  class TestId extends EntityId {
    public static create(): TestId {
      return new TestId(Uuid.create().value);
    }
    public static from(id: string): TestId {
      return new TestId(id);
    }
  }

  class TestDomainEvent1 extends DomainEvent {
    constructor(public readonly id: string) {
      super(TestId.from(id), "test/event1");
    }
  }
  class TestDomainEvent2 extends DomainEvent {
    constructor(public readonly id: string) {
      super(TestId.from(id), "test/event2");
    }
  }

  let manager: DomainEventSubscriberManager;
  let eventBus: DefaultEventBus;

  beforeEach(() => {
    manager = new DomainEventSubscriberManager();
    eventBus = new DefaultEventBus(manager);
  });

  it("Should publish a domain event", async () => {
    const subscriber1: DomainEventSubscriber<TestDomainEvent1> = {
      on: jest.fn(),
    };
    const subscriber2: DomainEventSubscriber<TestDomainEvent1> = {
      on: jest.fn(),
    };
    const subscriber3: DomainEventSubscriber<TestDomainEvent2> = {
      on: jest.fn(),
    };

    const id = Uuid.create().value;
    const event = new TestDomainEvent1(id);

    manager.subscribe(TestDomainEvent1, subscriber1);
    manager.subscribe(TestDomainEvent1, subscriber2);
    manager.subscribe(TestDomainEvent2, subscriber3);

    await eventBus.publish(event);

    expect(subscriber1.on).toHaveBeenCalledWith(event);
    expect(subscriber2.on).toHaveBeenCalledWith(event);
    expect(subscriber1.on).toHaveBeenCalledTimes(1);
    expect(subscriber2.on).toHaveBeenCalledTimes(1);
    expect(subscriber3.on).not.toHaveBeenCalled();
  });
});
