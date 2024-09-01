import { Base, type Values } from "@rouby/sheetdb";
import dayjs from "dayjs";
import { randomUUID } from "node:crypto";

export class DayWithoutSex extends Base {
  get sheetName() {
    return "DaysWithoutSex" as const;
  }
  get kind() {
    return "DayWithoutSex" as const;
  }

  public id = randomUUID();

  public userId = "";

  public dateTime = dayjs().toISOString();

  public onPeriod = false;

  constructor(props?: Values<DayWithoutSex>) {
    super();
    if (props) Object.assign(this, props);
  }

  public static findByUserAndDateTime(userId: string, dateTime: string) {
    return this.find((dayWithoutSex) => {
      return (
        dayWithoutSex.userId === userId &&
        dayjs(dayWithoutSex.dateTime).isSame(dateTime, "day")
      );
    });
  }
}
