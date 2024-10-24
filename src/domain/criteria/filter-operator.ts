import { InvariantViolationError } from "../error";
import { ValueObject } from "../model";

export const Operator = {
  EQUAL: "=",
  NOT_EQUAL: "!=",
  GT: ">",
  LT: "<",
  CONTAINS: "CONTAINS",
  NOT_CONTAINS: "NOT_CONTAINS",
} as const;

export type Operator = (typeof Operator)[keyof typeof Operator];

export class FilterOperator extends ValueObject<Operator> {
  private constructor(value: Operator) {
    super(value);
  }

  protected selfEquals(other: ValueObject<Operator>): boolean {
    return this.value === other.value;
  }

  public static create(value: Operator): FilterOperator {
    return new FilterOperator(value);
  }

  public static isValidOperator(value: string): boolean {
    return Object.values(Operator).includes(value as Operator);
  }

  public static parse(value: string): FilterOperator {
    if (!FilterOperator.isValidOperator(value)) {
      throw new InvariantViolationError("value", `Invalid operator: ${value}`);
    }
    return FilterOperator.create(value as Operator);
  }
}
