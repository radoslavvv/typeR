import { useSelector } from "react-redux";

import { RootState } from "../../../store/Store";

import Letter from "../../../models/Letter";
import WordModel from "../../../models/Word";
import CursorPosition from "../../../models/CursorPosition";
import LetterStatus from "../../../models/enums/LetterStatus";

interface IWordProps {
  word: WordModel;
  wordIndex: number;
  rowIndex: number;
}

const Word = ({ word, wordIndex, rowIndex }: IWordProps): JSX.Element => {
  const cursorPosition: CursorPosition = useSelector(
    (state: RootState) => state.writer.cursorPosition,
  );

  return (
    <div
      className={`word relative select-none text-[1.60rem] font-normal text-lightGray duration-300 ${
        cursorPosition.currentRowWordIndex === wordIndex &&
        cursorPosition.rowIndex === rowIndex
          ? "activeWord"
          : ""
      }`}
      row-index={rowIndex}
    >
      {word.letters.map((c: Letter, ci: number) => (
        <span
          key={c.content + ci}
          className={`border-1 border-solid duration-300 ${
            c.status === LetterStatus.Default
              ? "untyped"
              : c.status === LetterStatus.Wrong ||
                c.status === LetterStatus.Skipped
              ? "border-b-2 border-solid border-customRed text-customRed"
              : "text-customWhite"
          }`}
        >
          {c.content}
        </span>
      ))}
    </div>
  );
};

export default Word;
