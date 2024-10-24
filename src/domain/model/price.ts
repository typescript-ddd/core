import { InvariantViolationError } from "../error";
import { ValueObject } from "./value-object";

export interface PriceProps {
  amount: number;
  currency: string;
}

export class Price extends ValueObject<PriceProps> {
  protected constructor(props: PriceProps) {
    super(props);

    if (props.amount < 0) {
      throw new InvariantViolationError(
        "Price",
        "Amount must be zero or more."
      );
    }

    if (!props.currency) {
      throw new InvariantViolationError("Price", "Currency is required.");
    }

    if (props.currency.length !== 3) {
      throw new InvariantViolationError(
        "Price",
        "Currency must be three characters."
      );
    }
  }

  public get amount(): number {
    return this.value.amount;
  }

  public get currency(): string {
    return this.value.currency;
  }

  public sum(other: Price): Price {
    if (this.value.currency !== other.value.currency) {
      throw new InvariantViolationError(
        "Price",
        "Currencies must be the same."
      );
    }

    return Price.create({
      amount: this.value.amount + other.value.amount,
      currency: this.value.currency,
    });
  }

  public subtract(other: Price): Price {
    if (this.value.currency !== other.value.currency) {
      throw new InvariantViolationError(
        "Price",
        "Currencies must be the same."
      );
    }

    return Price.create({
      amount: this.value.amount - other.value.amount,
      currency: this.value.currency,
    });
  }

  protected selfEquals(other: ValueObject<PriceProps>): boolean {
    if (other === null || other === undefined) {
      return false;
    }
    return (
      this.value.amount === other.value.amount &&
      this.value.currency === other.value.currency
    );
  }

  public static create(props: PriceProps): Price {
    return new Price(props);
  }
}
