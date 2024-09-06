import { Base, type Values } from "@rouby/sheetdb";
import { randomUUID } from "node:crypto";

export class Tag extends Base {
	get sheetName() {
		return "Tags" as const;
	}
	get kind() {
		return "Tag" as const;
	}

	public id = randomUUID();

	public translationKey = "";

	public defaultMessage = "";

	constructor(props?: Values<Tag>) {
		super();
		if (props) Object.assign(this, props);
	}
}
