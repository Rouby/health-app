import { Base, type Values } from "@rouby/sheetdb";
import dayjs from "dayjs";
import { type UUID, randomUUID } from "node:crypto";

export class DayWithoutSex extends Base {
	get sheetName() {
		return "DaysWithoutSex" as const;
	}
	get kind() {
		return "DayWithoutSex" as const;
	}

	public id = randomUUID();

	public userId = "";

	public date = dayjs().format("YYYY-MM-DD");

	public onPeriod = false;

	constructor(props?: Values<DayWithoutSex>) {
		super();
		if (props) Object.assign(this, props);
	}

	public static findByUserAndDateTime(userId: UUID, date: string) {
		return this.find((dayWithoutSex) => {
			return (
				dayWithoutSex.userId === userId &&
				dayjs(dayWithoutSex.date).isSame(date, "day")
			);
		});
	}
}
