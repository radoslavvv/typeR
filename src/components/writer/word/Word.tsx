import { useSelector } from "react-redux";
import CursorPosition from "../../../models/CursorPosition";
import Letter from "../../../models/Letter";
import LetterStatus from "../../../models/LetterStatus";
import WordModel from "../../../models/Word";
import { RootState } from "../../../store/Store";

interface IWordProps {
  word: WordModel;
  wordIndex: number;
}

const Word = ({ word, wordIndex }: IWordProps) => {
  const cursorPosition: CursorPosition = useSelector(
    (state: RootState) => state.words.cursorPosition,
  );

  return (
    <div
      className={`text-2xl font-normal text-lightGray ${
        cursorPosition.wordIndex === wordIndex ? "activeWord" : ""
      }`}
    >
      {word.letters.map((c: Letter) => (
        <>
          <span
            className={`border-1 border-solid border-transparent duration-300 ${
              c.status === LetterStatus.Default
                ? "untyped"
                : c.status === LetterStatus.Wrong
                ? "text-customRed border-customRed border-b"
                : "text-customWhite"
            }`}
          >
            {c.content}
          </span>
        </>
      ))}
    </div>
  );
};

export default Word;
