import { Base, Values } from "@rouby/sheetdb";
import { randomUUID } from "crypto";

export class SexInterest extends Base {
  get sheetName() {
    return "SexInterests" as const;
  }
  get kind() {
    return "SexInterest" as const;
  }

  public id = randomUUID();

  public translationKey = "";

  public defaultMessage = "";

  public imagePath = "";

  public descriptionTranslationKey = "";

  public descriptionDefaultMessage = "";

  public tagIds: string[] = [];

  constructor(props?: Values<SexInterest>) {
    super();
    if (props) Object.assign(this, props);
  }
}
