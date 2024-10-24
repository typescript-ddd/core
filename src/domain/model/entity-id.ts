import { InvariantViolationError } from "../error";
import { ValueObject } from "./value-object";

export abstract class EntityId extends ValueObject<string> {
  protected selfEquals(other: EntityId): boolean {
    return this.value === other.value;
  }
  protected constructor(value: string) {
    super(value);
    if (!value) {
      throw new InvariantViolationError(this.constructor.name, "Id must be defined");
    }
  }
}
