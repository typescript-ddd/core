import { QueryBus } from "../../domain/bus/query";

export abstract class QueryAction<TRequest = any, TResponse = any, TContext = any> {
  method: string = "GET";
  path: string = "/";
  constructor(protected readonly queryBus: QueryBus) {}
  abstract execute(req: TRequest, res: TResponse, ctx: TContext): Promise<void>;
}
