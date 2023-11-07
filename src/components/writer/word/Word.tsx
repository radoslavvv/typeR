import { useSelector } from "react-redux";
import CursorPosition from "../../../models/CursorPosition";
import Letter from "../../../models/Letter";
import LetterStatus from "../../../models/enums/LetterStatus";
import WordModel from "../../../models/Word";
import { RootState } from "../../../store/Store";

interface IWordProps {
  word: WordModel;
  wordIndex: number;
  rowIndex: number;
}

const Word = ({ word, wordIndex, rowIndex }: IWordProps): JSX.Element => {
  const cursorPosition: CursorPosition = useSelector(
    (state: RootState) => state.words.cursorPosition,
  );

  return (
    <div
      className={`word relative select-none text-2xl font-normal text-lightGray duration-300 ${
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
              : c.status === LetterStatus.Wrong
              ? // ? "border-b-2 border-solid border-customRed text-customRed"
                "border-b-2 border-solid border-customRed text-customRed"
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
