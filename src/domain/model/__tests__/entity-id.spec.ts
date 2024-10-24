import { EntityId } from "../..";

class TestEntityId extends EntityId {
  constructor(id: string) {
    super(id);
  }
} 

describe("EntityId", () => {
  it("should initialize with id", () => {
    const entityId = new TestEntityId("test-id");
    expect(entityId).toBeDefined();
    expect(entityId.value).toBe("test-id");
  });

  it("Same value should be equal", () => {
    const entityId1 = new TestEntityId("test-id");
    const entityId2 = new TestEntityId("test-id");

    expect(entityId1.equals(entityId2)).toBeTruthy();
  });

  it("Different value should not be equal", () => { 
    const entityId1 = new TestEntityId("test-id-1");
    const entityId2 = new TestEntityId("test-id-2");

    expect(entityId1.equals(entityId2)).toBeFalsy();
  });
});