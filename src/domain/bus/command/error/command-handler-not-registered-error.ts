import { DomainError } from "../../../error/domain-error";

export class CommandHandlerNotRegisteredError extends DomainError {
  constructor(commandName: string) {
    super(`No command for ${commandName} has been registered`);
    this.name = "CommandHandlerNotRegisteredError";
  }
}