import { InvariantViolationError } from "../error";
import { ValueObject } from "../model";

export const OrderTypes = {
  ASC: "asc",
  DESC: "desc",
  NONE: "none",
} as const;

export type OrderTypes = (typeof OrderTypes)[keyof typeof OrderTypes];

export class OrderType extends ValueObject<OrderTypes> {
  private constructor(value: OrderTypes) {
    super(value);
  }

  protected selfEquals(other: ValueObject<OrderTypes>): boolean {
    return this.value === other.value;
  }

  public isNone(): boolean {
    return this.value === OrderTypes.NONE;
  }

  public isAscending(): boolean {
    return this.value === OrderTypes.ASC;
  }

  public isDescending(): boolean {
    return this.value === OrderTypes.DESC;
  }
  
  public static create(value: OrderTypes): OrderType {
    return new OrderType(value);
  }

  public static parse(value: string): OrderType {
    if (!Object.values(OrderTypes).includes(value as OrderTypes)) {
      throw new InvariantViolationError("value", `Invalid order type: ${value}`);
    }
    return OrderType.create(value as OrderTypes);
  }
}
