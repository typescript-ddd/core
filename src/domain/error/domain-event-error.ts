import { DomainError } from "./domain-error";

export class DomainEventError extends DomainError {
  constructor(message: string) {
    super(message);
    this.name = "DomainEventError";
  }
}
