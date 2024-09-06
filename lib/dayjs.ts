import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import minMax from "dayjs/plugin/minMax";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import weekday from "dayjs/plugin/weekday";

dayjs.extend(duration);
dayjs.extend(minMax);
dayjs.extend(relativeTime);
dayjs.extend(weekday);
dayjs.extend(timezone);

dayjs.tz.setDefault("Europe/Berlin");

export { dayjs };
