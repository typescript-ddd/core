import { ValueObject } from "../model";

export class FilterValue extends ValueObject<string> {
  private constructor(value: string) {
    super(value);
  }

  protected selfEquals(other: ValueObject<string>): boolean {
    return this.value === other.value;
  }

  public static create(value: string): FilterValue {
    return new FilterValue(value);
  }
}