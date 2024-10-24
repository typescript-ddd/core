import {
  Query,
  QueryBus,
  QueryHandlerRegistry,
} from "../../../domain/bus/query";

export class DefaultQueryBus implements QueryBus {
  constructor(private readonly registry: QueryHandlerRegistry) {}

  async ask<T extends Query, R = any>(query: T): Promise<R> {
    return (await this.registry.get(query).handle(query)) as R;
  }
}
