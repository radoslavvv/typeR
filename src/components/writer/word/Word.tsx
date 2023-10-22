import { useSelector } from "react-redux";
import CursorPosition from "../../../models/CursorPosition";
import Letter from "../../../models/Letter";
import LetterStatus from "../../../models/LetterStatus";
import WordModel from "../../../models/Word";
import { RootState } from "../../../store/Store";
import Cursor from "../cursor/Cursor";

interface IWordProps {
  word: WordModel;
  wordIndex: number;
}

const Word = ({ word, wordIndex }: IWordProps) => {
  const cursorPosition: CursorPosition = useSelector(
    (state: RootState) => state.words.cursorPosition,
  );

  return (
    <div className="text-2xl font-normal text-lightGray">
      {word.letters.map((c: Letter, ci: number) => (
        <>
          {cursorPosition.wordIndex === wordIndex &&
            cursorPosition.letterIndex === ci && <Cursor />}
          <span
            className="border-1 border-l border-solid border-transparent"
            style={{
              color:
                c.status === LetterStatus.Default
                  ? "#4b5975"
                  : c.status === LetterStatus.Wrong
                  ? "red"
                  : "#ccccb5",
              borderBottom:
                c.status === LetterStatus.Wrong ? "1px solid red" : "",
            }}
          >
            {c.content}
          </span>
        </>
      ))}
    </div>
  );
};

export default Word;
