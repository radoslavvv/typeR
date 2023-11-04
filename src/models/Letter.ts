import LetterStatus from "./enums/LetterStatus";

export default class Letter {
  public content: string;
  public status: LetterStatus;

  constructor(content: string) {
    this.content = content;
    this.status = LetterStatus.Default;
  }
}
