import { EntityId } from "./entity-id";

export type EntityValidationType = 
  | 'required'
  | 'min'
  | 'max'
  | 'minLength'
  | 'maxLength'
  | 'range';

export interface EntityUpdateProps<TId extends EntityId> {
  id: TId;
}
export interface EntityCreateProps {}

export abstract class Entity<TId extends EntityId> {
  private readonly _id: TId;
  protected constructor(id: TId) {
    this._id = id;
  }

  public get id(): TId {
    return this._id;
  }
}
