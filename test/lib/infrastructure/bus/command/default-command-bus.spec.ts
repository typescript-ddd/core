import { Command, CommandHandler, CommandHandlerRegistry } from "@src/domain";
import { DefaultCommandBus } from "@src/infrastructure";

describe("DefaultCommandBus", () => {
  class TestCommand1 implements Command {}
  class TestCommand2 implements Command {}
  let manager: CommandHandlerRegistry;
  let commandBus: DefaultCommandBus;

  beforeEach(() => {
    manager = new CommandHandlerRegistry();
    commandBus = new DefaultCommandBus(manager);
  });

  const handler1: CommandHandler<TestCommand1> = {
    handle: jest.fn(),
  };

  it("Should execute a command", async () => {
    const command = new TestCommand1();

    manager.register(TestCommand1, handler1);

    await commandBus.execute(command);

    expect(handler1.handle).toHaveBeenCalledWith(command);
  });

  it("Should throw an error if no handler is registered", async () => {
    const command = new TestCommand2();

    await expect(commandBus.execute(command)).rejects.toThrow(
      `No command for TestCommand2 has been registered`
    );
  });

  it("Should throw an error if the handler throws an error", async () => {
    const command = new TestCommand1();

    manager.register(TestCommand1, {
      handle: jest.fn().mockRejectedValue(new Error("Test error")),
    });

    await expect(commandBus.execute(command)).rejects.toThrow("Test error");
  });
});
