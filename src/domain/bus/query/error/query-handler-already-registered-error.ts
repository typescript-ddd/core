import { DomainError } from "../../../error/domain-error";

export class QueryHandlerAlreadyRegisteredError extends DomainError {
  constructor(queryName: string) {
    super(`A handler for ${queryName} has already been registered`);
    this.name = "QueryHandlerAlreadyRegisteredError";
  }
}
