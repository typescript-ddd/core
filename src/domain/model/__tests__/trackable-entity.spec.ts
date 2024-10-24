import {
  EntityCreateProps,
  EntityId,
  TrackableEntity,
  Uuid,
  UtcDate,
} from "../..";

interface CreateTestEntityProps extends EntityCreateProps {
  name: string;
  createdAtUtc?: UtcDate;
  updatedAtUtc?: UtcDate;
}

class TestEntityId extends EntityId {
  public static create(): TestEntityId {
    return new TestEntityId(Uuid.create().value);
  }
  public static from(id: string): TestEntityId {
    return new TestEntityId(id);
  }
}

export class TestEntity extends TrackableEntity<TestEntityId> {
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
    props: CreateTestEntityProps,
    id?: TestEntityId
  ): TestEntity {
    return new TestEntity(
      id ?? TestEntityId.create(),
      props.name,
      props.createdAtUtc,
      props.updatedAtUtc
    );
  }
}

describe("TrackableEntity", () => {
  it("Should default created at utc to Utc.now()", () => {
    const entity = TestEntity.create({ name: "John Doe" });
    expect(entity.getCreatedAtUtc()).toBeDefined();
  });

  it("Should default updated at utc to Utc.now()", () => {
    const entity = TestEntity.create({ name: "John Doe" });
    expect(entity.getUpdatedAtUtc()).toBeDefined();
  });

  it("Should set created at utc to provided value", () => {
    const createdAtUtc = UtcDate.create();
    const entity = TestEntity.create({
      name: "John Doe",
      createdAtUtc,
    });
    expect(entity.getCreatedAtUtc()).toBe(createdAtUtc);
  });

  it("Should set updated at utc to provided value", () => {
    const updatedAtUtc = UtcDate.create();
    const entity = TestEntity.create({
      name: "John Doe",
      updatedAtUtc,
    });
    expect(entity.getUpdatedAtUtc()).toBe(updatedAtUtc);
  });
});
