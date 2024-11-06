import { CommandBus } from "../../domain/bus/command";

export abstract class CommandAction<TReturn, TRequest = any> {
  method: string = "POST";
  path: string = "/";
  constructor(protected readonly commandBus: CommandBus) {}
  abstract execute(req: TRequest): Promise<TReturn>;
}
