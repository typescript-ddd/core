import { DomainError } from "../../../error/domain-error";

export class QueryHandlerNotRegisteredError extends DomainError {
  constructor(queryName: string) {
    super(`No query handler for ${queryName} has been registered`);
    this.name = "QueryHandlerNotRegisteredError";
  }
}