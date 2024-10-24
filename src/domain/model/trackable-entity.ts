import { Entity } from "./entity";
import { EntityId } from "./entity-id";
import { HasTimestamps } from "./has-timestamps";
import { UtcDate } from "./utc-date";

export class TrackableEntity<TId extends EntityId>
  extends Entity<TId>
  implements HasTimestamps
{
  protected createdAtUtc: UtcDate;
  protected updatedAtUtc: UtcDate;
  constructor(id: TId, createdAtUtc?: UtcDate, updatedAtUtc?: UtcDate) {
    super(id);
    const utcNow = UtcDate.now();

    this.createdAtUtc = createdAtUtc || UtcDate.create();
    this.updatedAtUtc = updatedAtUtc || UtcDate.create();
  }
  getCreatedAtUtc(): UtcDate {
    return this.createdAtUtc;
  }
  getUpdatedAtUtc(): UtcDate {
    return this.updatedAtUtc;
  }
}
