import dayjs, { type Dayjs } from "dayjs";
import "dayjs/locale/en";

import isoWeek from "dayjs/plugin/isoWeek";
import weekOfYear from "dayjs/plugin/weekOfYear";

dayjs.extend(weekOfYear);
dayjs.extend(isoWeek);

export const FILTERS: Record<string, Dayjs> = {
  today: dayjs().startOf("day"),
  tomorrow: dayjs().add(1, "day").startOf("day"),
  "on-this-week": dayjs().endOf("isoWeek"),
  "on-next-week": dayjs().add(1, "week").startOf("day"),
  later: dayjs().add(2, "week").startOf("day"),
};

export const COLUMN = [
  {
    label: "Today",
    id: "today",
  },
  {
    label: "Tomorrow",
    id: "tomorrow",
  },
  {
    label: "On this week",
    id: "on-this-week",
  },
  {
    label: "On next week",
    id: "on-this-week",
  },
  {
    label: "Later",
    id: "later",
  },
  {
    label: "Comleted",
    id: "completed",
  },
];
