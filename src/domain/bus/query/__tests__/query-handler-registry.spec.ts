import { Query, QueryHandler, QueryHandlerRegistry } from "../../..";

describe("QueryHandlerRegistry", () => {
  let manager: QueryHandlerRegistry;

  class TestQuery implements Query {
    public constructor(public readonly id: string) {}
  }

  const handler1: QueryHandler<TestQuery> = {
    handle: jest.fn(),
  };

  beforeEach(() => {
    manager = new QueryHandlerRegistry();
  });

  it("Should register a query handler", () => {
    const query = new TestQuery("1");

    manager.register(TestQuery, handler1);

    expect(manager.get(query)).toBe(handler1);
  });

  it("Should unregister a query handler", () => {
    const query = new TestQuery("1");

    manager.register(TestQuery, handler1);
    manager.unregister(TestQuery);

    expect(() => manager.get(query)).toThrow(
      `No query handler for TestQuery has been registered`
    );
  });

  it("Should not register a query handler twice", () => {
    const query = new TestQuery("1");

    manager.register(TestQuery, handler1);

    expect(() => manager.register(TestQuery, handler1)).toThrow(
      `A handler for TestQuery has already been registered`
    );
  });

  it("Should not unregister a query handler twice", () => {
    const query = new TestQuery("1");

    manager.register(TestQuery, handler1);
    manager.unregister(TestQuery);

    expect(() => manager.unregister(TestQuery)).not.toThrow();
  });
});
