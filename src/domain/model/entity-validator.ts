import { InvariantViolationError } from "../error";
import { EntityCreateProps, EntityUpdateProps } from "./entity";
import { EntityId } from "./entity-id";

export type EntityValidationProps<TId extends EntityId> =
  | EntityCreateProps
  | EntityUpdateProps<TId>;

export function isEntityUpdateProps<TId extends EntityId>(
  props: EntityValidationProps<TId>
): props is EntityCreateProps {
  return (props as EntityUpdateProps<any>)?.id !== undefined;
}

export abstract class EntityValidator<TId extends EntityId> {
  public validate(validationProps: EntityValidationProps<TId>): void {
    if (isEntityUpdateProps<TId>(validationProps)) {
      this.validateUpdates(validationProps as EntityUpdateProps<TId>);
    } else {
      this.validateCreation(validationProps);
    }
  }
  abstract validateUpdates(entityUpdateProps: EntityUpdateProps<any>): void;
  abstract validateCreation(entityCreateProps: EntityCreateProps): void;

  public static validateRequired(value: any, fieldName: string): void {
    if (!value) {
      throw new InvariantViolationError(fieldName, `${fieldName} is required`);
    }
  }
  public static validateMinLength(
    value: string,
    fieldName: string,
    length: number
  ): void {
    if (value.length < length) {
      throw new InvariantViolationError(
        fieldName,
        `${fieldName} must be at least ${length} characters long`
      );
    }
  }
  public static validateMaxLength(
    value: string,
    fieldName: string,
    length: number
  ): void {
    if (value.length > length) {
      throw new InvariantViolationError(
        fieldName,
        `${fieldName} must be at most ${length} characters long`
      );
    }
  }
  public static validateRange(
    value: number,
    fieldName: string,
    min: number,
    max: number
  ): void {
    if (value < min || value > max) {
      throw new InvariantViolationError(
        fieldName,
        `${fieldName} must be between ${min} and ${max}`
      );
    }
  }
  public static validateMin(value: number, fieldName: string, min: number): void {
    if (value < min) {
      throw new InvariantViolationError(
        fieldName,
        `${fieldName} must be at least ${min}`
      );
    }
  }
  public static validateMax(value: number, fieldName: string, max: number): void {
    if (value > max) {
      throw new InvariantViolationError(
        fieldName,
        `${fieldName} must be at most ${max}`
      );
    }
  }
}
