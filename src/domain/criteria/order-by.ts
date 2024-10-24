import { ValueObject } from "../model";

export class OrderBy extends ValueObject<string> {
  private constructor(value: string) {
    super(value);
  }

  protected selfEquals(other: ValueObject<string>): boolean {
    return this.value === other.value;
  }

  public static create(value: string): OrderBy {
    return new OrderBy(value);
  }
}