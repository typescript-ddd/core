import { AggregateRoot } from "./aggregate-root";
import { EntityId } from "./entity-id";
import { HasTimestamps } from "./has-timestamps";
import { UtcDate } from "./utc-date";

export class TrackableAggregateRoot<TId extends EntityId> extends AggregateRoot<TId> implements HasTimestamps {
    protected createdAtUtc: UtcDate;
    protected updatedAtUtc: UtcDate;
    constructor(id: TId, createdAtUtc?: UtcDate, updatedAtUtc?: UtcDate) {
        super(id);
        const utcNow = UtcDate.now();

        this.createdAtUtc = createdAtUtc || utcNow;
        this.updatedAtUtc = updatedAtUtc || UtcDate.from(utcNow.value);
    }
    getCreatedAtUtc(): UtcDate {
        return this.createdAtUtc;
    }
    getUpdatedAtUtc(): UtcDate {
        return this.updatedAtUtc;
    }
}