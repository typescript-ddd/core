import { Criteria, Filters, Order } from "../..";

describe("Criteria", () => {
  let filterMap: Map<string, string>;
  let filters: Filters;
  let order: Order;

  beforeAll(() => {
    filterMap = new Map<string, string>();
    filterMap.set("field", "name");
    filterMap.set("operator", "=");
    filterMap.set("value", "John Doe");
    filters = Filters.fromValues([filterMap]);
    order = Order.asc(filterMap.get("field") as string);
  });

  it("Should create a Criteria", () => {
    // Act
    const criteria = Criteria.create(filters, order);

    // Assert
    expect(criteria).toBeDefined();
  });

  it("Should throw an error if limit is less than 1", () => {
    // Act && Assert
    expect(() => Criteria.create(filters, order, -1, 0)).toThrow(
      "Invariant violation: limit. Limit must be greater than zero."
    );
  });

  it("Should throw an error if offset is less than 0", () => {
    // Act && Assert
    expect(() => Criteria.create(filters, order, 1, -1)).toThrow(
      "Invariant violation: offset. Offset must be greater than or equal to zero."
    );
  });

  it("hasFilters should return true if there are filters", () => {
    // Act
    const criteria = Criteria.create(filters, order);
    // Assert
    expect(criteria.hasFilters()).toBe(true);
  });

  it("Should return false if there are no filters", () => {
    // Arrange
    filters = Filters.none();
    // Act
    const criteria = Criteria.create(filters, order);
    // Assert
    expect(criteria.hasFilters()).toBe(false);
  });

  it("Should create a Criteria with limit and offset", () => {
    // Act
    const criteria = Criteria.create(filters, order, 1, 0);

    // Assert
    expect(criteria).toBeDefined();
    expect(criteria.limit).toBe(1);
    expect(criteria.offset).toBe(0);
  });
});
