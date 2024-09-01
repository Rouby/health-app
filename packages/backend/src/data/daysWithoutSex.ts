import { Base, Values } from "@rouby/sheetdb";
import { randomUUID } from "crypto";
import dayjs from "dayjs";

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
