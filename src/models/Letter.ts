import LetterStatus from "./LetterStatus";

export default class Letter {
  public content: string;
  public status: LetterStatus;

  constructor(content: string) {
    this.content = content;
    this.status = LetterStatus.Default;
  }
}
