import { InvariantViolationError } from "../error";
import { FilterField } from "./filter-field";
import { FilterOperator } from "./filter-operator";
import { FilterValue } from "./filter-value";

export class Filter {
  constructor(
    public readonly field: FilterField,
    public readonly operator: FilterOperator,
    public readonly value: FilterValue
  ) {}

  public static fromValues(values: Map<string, string>): Filter {
    const field = values.get("field");
    const operator = values.get("operator");
    const value = values.get("value");

    if (!field || !operator || !value) {
      throw new InvariantViolationError(
        "",
        "Field, operator and value are required."
      );
    }
    return new Filter(
      FilterField.create(field),
      FilterOperator.parse(operator),
      FilterValue.create(value)
    );
  }
}
