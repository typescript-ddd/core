import { InvariantViolationError } from "../error";
import { ValueObject } from "../model";

/**
 * Represents a field to filter by.
 */
export class FilterField extends ValueObject<string> {
  /**
   * Initializes a new instance of the FilterField class.
   * @param value The field name.
   */
  private constructor(value: string) {
    super(value);
    if (!value) {
        throw new InvariantViolationError("value", "A filter field must have a value.");
    }
  }

  /**
   * @inheritdoc
   */
  protected selfEquals(other: FilterField): boolean {
    return this.value === other.value;
  }

  /**
   * Creates a new instance of the FilterField class from a value.
   * @param value string - The field name.
   * @returns FilterField
   */
  public static create(value: string): FilterField {
    return new FilterField(value);
  }
}
