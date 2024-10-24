import { Repository } from "../../domain/model/repository";
import { Criteria } from "../../domain/criteria/criteria";

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
    const entity = this.data.get(id);
    return Promise.resolve(entity);
  }
  save(entity: TData): Promise<void> {
    this.data.set(entity.id, entity);
    return Promise.resolve();
  }
  remove(entity: TId): Promise<void> {
    this.data.delete(entity);
    return Promise.resolve();
  }

  protected seed(data: TData[]): void {
    data.forEach((entity) => this.data.set(entity.id, entity));
  }
}
