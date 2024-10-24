import { QueryHandlerAlreadyRegisteredError, QueryHandlerNotRegisteredError } from "./error";
import { Query } from "./query";
import { QueryHandler } from "./query-handler";

export type QueryClass<T extends Query> = new (...args: any[]) => T;

export class QueryHandlerRegistry {
  private readonly handlers: Map<string, QueryHandler<Query>> = new Map();

  register<T extends Query>(query: QueryClass<T>, handler: QueryHandler<T>) {
    if (this.handlers.has(query.name)) {
      throw new QueryHandlerAlreadyRegisteredError(query.name);
    }

    this.handlers.set(query.name, handler);
  }

  unregister(query: QueryClass<Query>) {
    this.handlers.delete(query.name);
  }

  get<T extends Query>(query: T): QueryHandler<T> {
    const queryName = query.constructor.name;
    const handler = this.handlers.get(queryName);
    if (!handler) {
      throw new QueryHandlerNotRegisteredError(queryName);
    }
    return handler;
  }
}
