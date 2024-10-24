import {
  Command,
  CommandBus,
  CommandHandlerRegistry,
} from "../../../domain/bus/command";

export class DefaultCommandBus implements CommandBus {
  constructor(private readonly commandHandlerRegistry: CommandHandlerRegistry) {
    this.commandHandlerRegistry = commandHandlerRegistry;
  }

  async execute<T extends Command, R = void>(command: T): Promise<R> {
    const handler = this.commandHandlerRegistry.get(command);
    return await handler.handle(command);
  }
}
