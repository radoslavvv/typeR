export default class CursorPosition {
  public wordIndex: number;
  public letterIndex: number;

  constructor(wordIndex: number, letterIndex: number) {
    this.wordIndex = wordIndex;
    this.letterIndex = letterIndex;
  }
}
