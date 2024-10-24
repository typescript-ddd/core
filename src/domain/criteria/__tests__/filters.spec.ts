import { Filters } from "../..";

describe("Filters", () => {
  let filterMap: Map<string, string>;

  beforeAll(() => {
    filterMap = new Map<string, string>();
    filterMap.set("field", "name");
    filterMap.set("operator", "=");
    filterMap.set("value", "John Doe");
  });

  it("Should create a Filters", () => {
    // Act
    const filters = Filters.fromValues([filterMap]);

    // Assert
    expect(filters).toBeDefined();
  });

  it("Should throw an error if filters are empty", () => {
    // Act && Assert
    expect(() => Filters.fromValues([])).toThrow("Invariant violation: filters. At least one filter is required.");
  });

  it("Should return a Filters instance with no filters", () => {
    // Act
    const filters = Filters.none();

    // Assert
    expect(filters.filters.length).toBe(0);
  });

  it("Should return a Filters instance with one filter", () => {
    // Act
    const filters = Filters.fromValues([filterMap]);

    // Assert
    expect(filters.filters.length).toBe(1);
  });

  it("Should throw if filter is missing field", () => {
    // Arrange
    filterMap.delete("field");

    // Act && Assert
    expect(() => Filters.fromValues([filterMap])).toThrow("Invariant violation: . Field, operator and value are required.");
  });

  it("Should throw if filter is missing operator", () => {
    // Arrange
    filterMap.delete("operator");

    // Act && Assert
    expect(() => Filters.fromValues([filterMap])).toThrow("Invariant violation: . Field, operator and value are required.");
  });

  it("Should throw if filter is missing value", () => {
    // Arrange
    filterMap.delete("value");

    // Act && Assert
    expect(() => Filters.fromValues([filterMap])).toThrow("Invariant violation: . Field, operator and value are required.");
  });
  it("Should throw if filter is missing field, operator and value", () => {
    // Arrange
    filterMap.delete("field");
    filterMap.delete("operator");
    filterMap.delete("value");

    // Act && Assert
    expect(() => Filters.fromValues([filterMap])).toThrow("Invariant violation: . Field, operator and value are required.");
  });

  it("Should throw if operator is invalid", () => {
    // Arrange
    filterMap.set("operator", "invalid");

    // Act && Assert
    expect(() => Filters.fromValues([filterMap])).toThrow("Invariant violation: . Field, operator and value are required.");
  });
});
