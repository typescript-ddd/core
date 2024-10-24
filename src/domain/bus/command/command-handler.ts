import { Command } from "./command";

export interface CommandHandler<T extends Command, R = any> {
    handle(command: T): Promise<R>;
}