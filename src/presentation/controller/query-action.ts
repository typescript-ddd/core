import { QueryBus } from "../../domain/bus/query";

export abstract class QueryAction<TReturn = any, TRequest = any> {
  method: string = "GET";
  path: string = "/";
  constructor(protected readonly queryBus: QueryBus) {}
  abstract execute(req: TRequest): Promise<TReturn>;
}
