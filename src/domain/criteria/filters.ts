import { InvariantViolationError } from "../error";
import { Filter } from "./filter";

export class Filters {
  private constructor(public readonly filters: Filter[]) {}

  public static fromValues(filters: Array<Map<string, string>>): Filters {
    if (!filters || filters.length === 0) {
      throw new InvariantViolationError(
        "filters",
        "At least one filter is required."
      );
    }
    return new Filters(filters.map(Filter.fromValues));
  }

  public static none(): Filters {
    return new Filters([]);
  }
}
