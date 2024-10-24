import { AggregateRoot, DomainEvent, EntityId, Uuid } from "../..";

class TestId extends EntityId {
  public static create(): TestId {
    return new TestId(Uuid.create().value);
  }
  public static from(id: string): TestId {
    return new TestId(id);
  }
}

class TestAggregateCreatedEvent extends DomainEvent {
  public constructor(aggregateId: TestId) {
    super(aggregateId, "test/aggregate-created", {
      aggregateId: aggregateId.value,
    });
  }
}

class TestAggregateRoot extends AggregateRoot<TestId> {
  private constructor(id: TestId) {
    super(id);
  }

  public static create(): TestAggregateRoot {
    var id = TestId.create();
    var entity = new TestAggregateRoot(id);
    entity.applyChange(new TestAggregateCreatedEvent(id));

    return entity;
  }
}

describe("AggregateRoot", () => {
  it("Should be created", () => {
    const aggregate = TestAggregateRoot.create();
    expect(aggregate).toBeDefined();
    expect(aggregate.id).toBeDefined();
    expect(aggregate.id.value).toBeDefined();
    expect(aggregate).toBeInstanceOf(TestAggregateRoot);
  });

  it("create should apply created event", () => {
    const aggregate = TestAggregateRoot.create();

    const events = aggregate.getUncommittedEvents();
    expect(events).toBeDefined();
    expect(events.length).toBe(1);
    expect(events[0].type).toBe("test/aggregate-created");
    expect(events[0].aggregateId.value).toBe(aggregate.id.value);
  });

  it("markChangesAsCommitted should clear uncommitted events", () => {
    const aggregate = TestAggregateRoot.create();
    aggregate.markChangesAsCommitted();

    const events = aggregate.getUncommittedEvents();
    expect(events).toBeDefined();
    expect(events.length).toBe(0);
  });
});
