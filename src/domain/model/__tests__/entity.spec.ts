import { Entity, EntityId, Uuid } from "../..";

class TestEntityId extends EntityId {
  public static create(): TestEntityId {
    return new TestEntityId(Uuid.create().value);
  }
  public static from(id: string): TestEntityId {
    return new TestEntityId(id);
  }
}

export class TestEntity extends Entity<TestEntityId> {
  private constructor(id: EntityId) {
    super(id);
  }

  public static create(): TestEntity {
    var id = TestEntityId.create();
    return new TestEntity(id);
  }
}

describe("Entity", () => {
  it("Should be created", () => {
    const entity = TestEntity.create();
    expect(entity).toBeDefined();
    expect(entity.id).toBeDefined();
    expect(entity.id.value).toBeDefined();
    expect(entity).toBeInstanceOf(TestEntity);
  });
});
