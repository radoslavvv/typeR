import { useSelector } from "react-redux";
import CursorPosition from "../../../models/CursorPosition";
import Letter from "../../../models/Letter";
import LetterStatus from "../../../models/enums/LetterStatus";
import WordModel from "../../../models/Word";
import { RootState } from "../../../store/Store";

interface IWordProps {
  word: WordModel;
  wordIndex: number;
}

const Word = ({ word, wordIndex }: IWordProps): JSX.Element => {
  const cursorPosition: CursorPosition = useSelector(
    (state: RootState) => state.words.cursorPosition,
  );

  return (
    <div
      className={`select-none text-2xl font-normal text-lightGray ${
        cursorPosition.wordIndex === wordIndex ? "activeWord" : ""
      }`}
    >
      {word.letters.map((c: Letter, ci: number) => (
        <span
          key={c.content + ci}
          className={`border-1 border-solid duration-300 ${
            c.status === LetterStatus.Default
              ? "untyped"
              : c.status === LetterStatus.Wrong
              ? // ? "border-b-2 border-solid border-customRed text-customRed"
                "text-customRed"
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
