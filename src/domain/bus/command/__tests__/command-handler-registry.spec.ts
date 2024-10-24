import { Command, CommandHandler, CommandHandlerRegistry } from "../..";
import { Uuid } from "../../../model";

describe("CommandHandlerRegistry", () => {
  let manager: CommandHandlerRegistry;

  class TestCommand implements Command {
    public constructor(public readonly id: string) {}
  }

  const handler1: CommandHandler<TestCommand> = {
    handle: jest.fn(),
  };

  beforeEach(() => {
    manager = new CommandHandlerRegistry();
  });

  it("Should register a command handler", () => {
    const command = new TestCommand(Uuid.create().value);

    manager.register(TestCommand, handler1);

    expect(manager.get(command)).toBe(handler1);
  });

  it("Should unregister a command handler", () => {
    const command = new TestCommand(Uuid.create().value);

    manager.register(TestCommand, handler1);
    manager.unregister(TestCommand);

    expect(() => manager.get(command)).toThrow(
      `No command for TestCommand has been registered`
    );
  });

  it("Should not register a command handler twice", () => {
    const command = new TestCommand(Uuid.create().value);

    manager.register(TestCommand, handler1);

    expect(() => manager.register(TestCommand, handler1)).toThrow(
      `A command for TestCommand has already been registered`
    );
  });

  it("Should not unregister a command handler twice", () => {
    const command = new TestCommand(Uuid.create().value);

    manager.register(TestCommand, handler1);
    manager.unregister(TestCommand);

    expect(() => manager.unregister(TestCommand)).not.toThrow();
  });
});
