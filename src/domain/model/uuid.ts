import { randomUUID } from "crypto";
import { InvariantViolationError } from "../error";

const UUID =
  /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

export class Uuid {
  protected constructor(public readonly value: string) {
    if (!value) {
      throw new InvariantViolationError("Uuid", "Value is required");
    }
    if (!UUID.test(value)) {
      throw new InvariantViolationError("Uuid", "Invalid UUID format");
    }
  }

  equals(other: Uuid): boolean {
    if (other === null || other === undefined) {
      return false;
    }
    if (this.constructor !== other.constructor) {
      return false;
    }
    return this.value === other.value;
  }

  public static create(): Uuid {
    return new this(randomUUID());
  }

  public static fromString(value: string): Uuid {
    return new this(value);
  }
}
