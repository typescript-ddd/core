import { DomainError } from "../../../error/domain-error";

export class CommandHandlerAlreadyRegisteredError extends DomainError {
    constructor(commandName: string) {
        super(`A command for ${commandName} has already been registered`);
        this.name = "CommandHandlerAlreadyRegisteredError";
    }
}