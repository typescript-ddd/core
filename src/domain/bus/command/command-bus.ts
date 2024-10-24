import { Command } from "./command";

export interface CommandBus {
  execute<T extends Command, R = any>(command: T): Promise<R>;
}
