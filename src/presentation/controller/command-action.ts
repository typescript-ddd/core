import { CommandBus } from "../../domain/bus/command";

export abstract class CommandAction<TRequest = any, TResponse = any, TContext = any> {
  method: string = "POST";
  path: string = "/";
  constructor(protected readonly commandBus: CommandBus) {}
  abstract execute(req: TRequest, res: TResponse, ctx: TContext): Promise<void>;
}
