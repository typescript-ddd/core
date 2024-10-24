import { UtcDate } from "./utc-date";

export interface HasTimestamps {
  getCreatedAtUtc(): UtcDate;
  getUpdatedAtUtc(): UtcDate;
}
