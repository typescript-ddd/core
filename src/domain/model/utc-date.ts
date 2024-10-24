import { InvariantViolationError } from "../error";
import { ValueObject } from "./value-object";

export class UtcDate extends ValueObject<Date> {
  protected selfEquals(other: UtcDate): boolean {
    return this.value.getTime() === other.value.getTime();
  }

  protected constructor(value: Date) {
    super(value);
  }

  public static create(): UtcDate {
    const date = new Date();
    return new UtcDate(
      new Date(
        Date.UTC(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          date.getHours(),
          date.getMinutes(),
          date.getSeconds(),
          date.getMilliseconds()
        )
      )
    );
  }

  public static from(date: Date): UtcDate {
    return new UtcDate(
      new Date(
        Date.UTC(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          date.getHours(),
          date.getMinutes(),
          date.getSeconds(),
          date.getMilliseconds()
        )
      )
    );
  }

  public static now(): UtcDate {
    return new UtcDate(new Date());
  }

  public static parse(value: unknown): UtcDate {
    if (typeof value === "string") {
      return new UtcDate(new Date(value));
    } else if (typeof value === "number") {
      return new UtcDate(new Date(value));
    } else if (value instanceof Date) {
      return new UtcDate(value);
    }
    throw new InvariantViolationError(
      "value",
      "must be a string, number or Date"
    );
  }
}
