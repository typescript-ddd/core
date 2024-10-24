import { InvariantViolationError } from "../error";
import { Filters } from "./filters";
import { Order } from "./order";

export class Criteria {
  private constructor(
    public readonly filters: Filters,
    public readonly order: Order,
    public readonly limit?: number,
    public readonly offset?: number
  ) {}

  public hasFilters(): boolean {
    return this.filters.filters.length > 0;
  }

  public static create(
    filters: Filters,
    order: Order,
    limit?: number,
    offset?: number
  ): Criteria {
    if (limit && limit < 1) {
      throw new InvariantViolationError(
        "limit",
        "Limit must be greater than zero."
      );
    }
    if (offset && offset < 0) {
      throw new InvariantViolationError(
        "offset",
        "Offset must be greater than or equal to zero."
      );
    }
    return new Criteria(filters, order, limit, offset);
  }
}
