import { DomainError } from "./domain-error";

export class InvariantViolationError extends DomainError {
  constructor(public readonly invariantName: string, message: string) {
    super(`Invariant violation: ${invariantName}. ${message}`);
  }
}