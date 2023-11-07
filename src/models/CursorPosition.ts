export default class CursorPosition {
  public allWordsIndex: number;
  public currentRowWordIndex: number;
  public letterIndex: number;
  public rowIndex: number = 0;

  constructor(
    allWordsIndex: number,
    currentRowWordIndex: number,
    letterIndex: number,
    rowIndex: number,
  ) {
    this.allWordsIndex = allWordsIndex;
    this.currentRowWordIndex = currentRowWordIndex;
    this.letterIndex = letterIndex;
    this.rowIndex = rowIndex ? rowIndex : 0;
  }
}
