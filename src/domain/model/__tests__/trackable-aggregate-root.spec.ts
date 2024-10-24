import {
    EntityId,
    Uuid,
    UtcDate,
    EntityCreateProps,
    TrackableAggregateRoot,
  } from "../..";
  
  interface CreateTestAggregateProps extends EntityCreateProps {
    name: string;
    createdAtUtc?: UtcDate;
    updatedAtUtc?: UtcDate;
  }
  
  class TestAggregateId extends EntityId {
    public static create(): TestAggregateId {
      return new TestAggregateId(Uuid.create().value);
    }
    public static from(id: string): TestAggregateId {
      return new TestAggregateId(id);
    }
  }
  
  export class TestAggregate extends TrackableAggregateRoot<TestAggregateId> {
    private constructor(
      id: EntityId,
      private name: string,
      createdAtUtc?: UtcDate,
      updatedAtUtc?: UtcDate
    ) {
      super(id, createdAtUtc, updatedAtUtc);
    }
  
    public getName(): string {
      return this.name;
    }
  
    public static create(
      props: CreateTestAggregateProps,
      id?: TestAggregateId
    ): TestAggregate {
      return new TestAggregate(
        id ?? TestAggregateId.create(),
        props.name,
        props.createdAtUtc,
        props.updatedAtUtc
      );
    }
  }
  
  describe("TrackableAggregateRoot", () => {
    it("Should default created at utc to Utc.now()", () => {
      const entity = TestAggregate.create({ name: "John Doe" });
      expect(entity.getCreatedAtUtc()).toBeDefined();
    });
  
    it("Should default updated at utc to Utc.now()", () => {
      const entity = TestAggregate.create({ name: "John Doe" });
      expect(entity.getUpdatedAtUtc()).toBeDefined();
    });
  
    it("Should set created at utc to provided value", () => {
      const createdAtUtc = UtcDate.create();
      const entity = TestAggregate.create({
        name: "John Doe",
        createdAtUtc,
      });
      expect(entity.getCreatedAtUtc()).toBe(createdAtUtc);
    });
  
    it("Should set updated at utc to provided value", () => {
      const updatedAtUtc = UtcDate.create();
      const entity = TestAggregate.create({
        name: "John Doe",
        updatedAtUtc,
      });
      expect(entity.getUpdatedAtUtc()).toBe(updatedAtUtc);
    });
  });
  