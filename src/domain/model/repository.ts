import { Criteria } from "../criteria/criteria";

export interface Repository<TId, TValue> {
    getAll(criteria?: Criteria): Promise<TValue[]>;
    getById(id: TId): Promise<TValue | undefined>;
    save(entity: TValue): Promise<void>;
    remove(entity: TId): Promise<void>;
}