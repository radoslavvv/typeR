import { useSelector } from "react-redux";

import { RootState } from "../../../store/Store";

import Word from "../../../models/Word";
import CursorPosition from "../../../models/CursorPosition";

const WordCounter = () => {
  const cursorPosition: CursorPosition = useSelector(
    (state: RootState) => state.words.cursorPosition,
  );

  const words: Word[] = useSelector((state: RootState) => state.words.words);

  return (
    <div className="mb-1 select-none text-2xl text-lightBlue">
      {cursorPosition.allWordsIndex}/{words.length}
    </div>
  );
};

export default WordCounter;
