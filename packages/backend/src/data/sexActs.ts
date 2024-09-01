import { Base, Values } from "@rouby/sheetdb";
import { randomUUID } from "crypto";
import dayjs from "dayjs";

export class SexAct extends Base {
  get sheetName() {
    return "SexActs" as const;
  }
  get kind() {
    return "SexAct" as const;
  }

  public id = randomUUID();

  public userId = "";

  public dateTime = dayjs().toISOString();

  public duration = "";

  public location = "";

  public initiator = "" as "USER" | "PARTNER";

  public foreplayOnUser = "";

  public foreplayOnPartner = "";

  public position = "";

  public userFinished = false;

  public partnerFinished = false;

  constructor(props?: Values<SexAct>) {
    super();
    if (props) Object.assign(this, props);
  }
}
