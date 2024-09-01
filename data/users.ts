import { Base, type Values } from "@rouby/sheetdb";
import dayjs from "dayjs";
import { randomUUID } from "node:crypto";

export class User extends Base {
  get sheetName() {
    return "Users" as const;
  }
  get kind() {
    return "User" as const;
  }

  public id = randomUUID();

  public email = "";

  public createdAt = dayjs().toISOString();

  public updatedAt = dayjs().toISOString();

  public name = "";

  public firstDayOfWeek = 0;

  public partnerId = "";

  public pushNotifications: {
    endpoint: string;
    keys: { p256dh: string; auth: string };
  }[] = [];

  public password = "";

  constructor(props?: Values<User>) {
    super();
    if (props) Object.assign(this, props);
  }

  public static findByEmail(email: string) {
    return this.find((user) => user.email === email);
  }
}
