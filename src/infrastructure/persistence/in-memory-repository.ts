import { Repository } from "../../domain/model/repository";
import { Criteria } from "../../domain/criteria/criteria";
import { EntityId } from "../../domain";

interface EntityData<TId> {
  id: TId;
}

export class InMemoryRepository<TId, TData extends EntityData<TId>>
  implements Repository<TId, TData>
{
  private data: Map<TId, TData> = new Map<TId, TData>();

  public constructor(seedData?: TData[]) {
    if (seedData) {
      this.seed(seedData);
    }
  }

  getAll(criteria?: Criteria): Promise<TData[]> {
    return Promise.resolve(Array.from(this.data.values()));
  }
  getById(id: TId): Promise<TData | undefined> {
    if (id instanceof EntityId) {
      const entity = this.data.get(id.value as TId);
      return Promise.resolve(entity);
    }
    const entity = this.data.get(id);
    return Promise.resolve(entity);
  }
  save(entity: TData): Promise<void> {
    if (entity.id instanceof EntityId) {
      this.data.set(entity.id.value as TId, entity);
      return Promise.resolve();
    }
    this.data.set(entity.id, entity);
    return Promise.resolve();
  }
  remove(entityId: TId): Promise<void> {
    if (entityId instanceof EntityId) {
      this.data.delete(entityId.value as TId);
    } else {
      this.data.delete(entityId);
    }
    return Promise.resolve();
  }

  protected seed(data: TData[]): void {
    data.forEach((entity) => {
      if (entity.id instanceof EntityId) {
        this.data.set(entity.id.value as TId, entity);
        return;
      }
      this.data.set(entity.id, entity);
    });
  }
}
