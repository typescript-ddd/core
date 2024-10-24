import { Price } from "../model";

export class PriceView {
  private _currency: string;
  private constructor(public readonly amount: number, currency: string) {
    this._currency = currency ? currency.toUpperCase() : "";
  }

  get currency(): string {
    return this._currency;
  }

  public static create(price: Price): PriceView {
    return new PriceView(price.amount, price.currency);
  }
}
