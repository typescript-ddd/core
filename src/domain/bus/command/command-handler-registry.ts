import { Command } from "./command";
import { CommandHandler } from "./command-handler";
import { CommandHandlerAlreadyRegisteredError, CommandHandlerNotRegisteredError } from "./error";

export type CommandClass<T extends Command> = new (...args: any[]) => T;

export class CommandHandlerRegistry {
    private readonly handlers: Map<string, CommandHandler<Command>> = new Map();

    register<T extends Command>(command: CommandClass<T>, handler: CommandHandler<T>) {
        if (this.handlers.has(command.name)) {
            throw new CommandHandlerAlreadyRegisteredError(command.name);
        }

        this.handlers.set(command.name, handler);
    }

    unregister(command: CommandClass<Command>) {
        this.handlers.delete(command.name);
    }

    get<T extends Command>(command: T): CommandHandler<T> {
        const commandName = command.constructor.name;
        const handler = this.handlers.get(commandName);
        if (!handler) {
            throw new CommandHandlerNotRegisteredError(commandName);
        }
        return handler;
    }
}