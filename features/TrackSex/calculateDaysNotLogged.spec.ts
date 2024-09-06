import { describe, expect, it } from "vitest";
import { calculateDaysNotLogged } from "./calculateDaysNotLogged";

describe("dayjs", () => {
	it("should be able to parse a date", () => {
		expect(
			calculateDaysNotLogged(
				[
					"2023-08-01",
					"2023-08-02",
					"2023-08-03",
					"2023-08-04",
					"2023-08-05",
					"2023-08-05T22:30:04.010Z",
				],
				new Date("2023-08-07"),
			),
		).toMatchObject([]);
	});
});
