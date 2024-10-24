import { Entity, EntityId, Uuid } from "../..";
import { InMemoryRepository } from "../../../infrastructure";

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


describe("InMemoryRepository", () => {
    it("Should be created", () => {
        const repository = new InMemoryRepository<TestEntityId, TestEntity>();
        expect(repository).toBeDefined();
    });
});