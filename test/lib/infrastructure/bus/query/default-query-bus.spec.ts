import { Query, QueryHandler, QueryHandlerRegistry } from "@src/domain";
import { DefaultQueryBus } from "@src/infrastructure";

describe("DefaultQueryBus", () => {
  class TestQuery1 implements Query {}
  class TestQuery2 implements Query {}
  let manager: QueryHandlerRegistry;
  let QueryBus: DefaultQueryBus;

  beforeEach(() => {
    manager = new QueryHandlerRegistry();
    QueryBus = new DefaultQueryBus(manager);
  });

  const handler1: QueryHandler<TestQuery1> = {
    handle: jest.fn(),
  };

  it("Should execute a Query", async () => {
    const query = new TestQuery1();

    manager.register(TestQuery1, handler1);

    await QueryBus.ask(query);

    expect(handler1.handle).toHaveBeenCalledWith(query);
  });

  it("Should throw an error if no handler is registered", async () => {
    const query = new TestQuery2();

    await expect(QueryBus.ask(query)).rejects.toThrow(
      `No query handler for TestQuery2 has been registered`
    );
  });

  it("Should throw an error if the handler throws an error", async () => {
    const query = new TestQuery1();

    manager.register(TestQuery1, {
      handle: jest.fn().mockRejectedValue(new Error("Test error")),
    });

    await expect(QueryBus.ask(query)).rejects.toThrow("Test error");
  });
});
