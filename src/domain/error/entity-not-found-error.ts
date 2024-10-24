import { EntityId } from "../model";
import { DomainError } from "./domain-error";

export class EntityNotFoundError extends DomainError {
  constructor(entityName: string, entityId: EntityId) {
    super(`${entityName} with id ${entityId} not found`);
  }
}
