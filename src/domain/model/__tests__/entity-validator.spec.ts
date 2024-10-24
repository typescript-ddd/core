import {
  EntityCreateProps,
  EntityId,
  EntityUpdateProps,
  EntityValidator,
  InvariantViolationError,
  Uuid,
} from "../..";

class TestEntityId extends EntityId {
  constructor(id: string) {
    super(id);
  }
  public static create(): TestEntityId {
    return new TestEntityId(Uuid.create().value);
  }
  public static from(value: string): TestEntityId {
    return new TestEntityId(value);
  }
}

interface TestEntityCreateProps extends EntityCreateProps {
  name: string;
}

interface TestEntityUpdateProps<TId extends EntityId>
  extends EntityUpdateProps<TId> {
  id: TId;
  name: string;
}

class TestEntityValidator extends EntityValidator<TestEntityId> {
  validateUpdates(entityUpdateProps: TestEntityUpdateProps<any>): void {
    this.validateId(entityUpdateProps.id);
    this.validateName(entityUpdateProps.name);
  }
  validateCreation(entityCreateProps: TestEntityCreateProps): void {
    this.validateName(entityCreateProps.name);
  }

  private validateId(id: TestEntityId): void {
    if (!id || !id.value) {
      throw new InvariantViolationError("id", "Id is required");
    }
  }

  private validateName(name: string): void {
    if (!name) {
      throw new InvariantViolationError("name", "Name is required");
    }
    if (name.length < 3) {
      throw new InvariantViolationError(
        "name",
        "Name must be at least 3 characters long"
      );
    }
  }

  constructor() {
    super();
  }
}

describe("EntityValidator", () => {
  let validator: TestEntityValidator;

  beforeEach(() => {
    validator = new TestEntityValidator();
  });

  it("Should validate creation", () => {
    const props: TestEntityCreateProps = {
      name: "test",
    };
    expect(() => validator.validate(props)).not.toThrow();
  });

  it("Should throw when creating and name is missing", () => {
    const props: TestEntityCreateProps = {
      name: "",
    };
    expect(() => validator.validate(props)).toThrow("Name is required");
  });

  it("Should validate update", () => {
    const props: TestEntityUpdateProps<TestEntityId> = {
      id: TestEntityId.create(),
      name: "test",
    };
    expect(() => validator.validate(props)).not.toThrow();
  });

  it("Should throw when updating and id is missing", () => {
    
    expect(() => {
        const props: TestEntityUpdateProps<TestEntityId> = {
            id: TestEntityId.from(""),
            name: "test",
          };
    }).toThrow("Invariant violation: TestEntityId. Id must be defined");
  });

  it("Should throw when updating and name is missing", () => {
    const props: TestEntityUpdateProps<TestEntityId> = {
      id: TestEntityId.create(),
      name: "",
    };
    expect(() => validator.validate(props)).toThrow("Name is required");
  });

  it("Should throw when updating and name is too short", () => {
    const props: TestEntityUpdateProps<TestEntityId> = {
      id: TestEntityId.create(),
      name: "te",
    };
    expect(() => validator.validate(props)).toThrow("Name must be at least 3 characters long");
  });
});
