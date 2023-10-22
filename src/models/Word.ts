import Letter from "./Letter";

export default class Word {
  public content: string;
  public letters: Letter[];

  constructor(content: string) {
    this.content = content;

    this.letters = content.split("").map((l: string) => new Letter(l));
  }
}
