import React from "react";
import { useSelector } from "react-redux";
import Word from "../../../models/Word";

import { getRandomWords } from "../../../utils/Utilities";
import { MOST_USED_WORDS } from "../../../utils/words";
import WordsList from "../wordsList/WordsList";
import { RootState, useAppDispatch } from "../../../store/Store";
import {
  setCursorPosition,
  setWords,
} from "../../../store/features/WordsSlice";
import CursorPosition from "../../../models/CursorPosition";
import LetterStatus from "../../../models/LetterStatus";
import Cursor from "../cursor/Cursor";

const WriterContainer = () => {
  const dispatch = useAppDispatch();

  const cursorPosition: CursorPosition = useSelector(
    (state: RootState) => state.words.cursorPosition,
  );

  const words: Word[] = useSelector((state: RootState) => state.words.words);

  React.useEffect(() => {
    const randomWords: string[] = getRandomWords(MOST_USED_WORDS, 300);
    const parsedWords: Word[] = randomWords.map((w) => new Word(w));

    dispatch(setWords(parsedWords));
  }, []);

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.code === "Space") {
      dispatch(setCursorPosition([cursorPosition.wordIndex + 1, 0]));
      return;
    } else if (e.code === "Backspace") {
      let newCursorPosition: CursorPosition = new CursorPosition(0, 0);
      if (cursorPosition.letterIndex === 0) {
        newCursorPosition = new CursorPosition(
          Math.max(cursorPosition.wordIndex - 1, 0),
          words[Math.max(cursorPosition.wordIndex - 1, 0)].letters.length,
        );
      } else {
        newCursorPosition = new CursorPosition(
          cursorPosition.wordIndex,
          Math.max(cursorPosition.letterIndex - 1, 0),
        );
      }

      dispatch(
        setCursorPosition([
          newCursorPosition.wordIndex,
          newCursorPosition.letterIndex,
        ]),
      );

      const newWords: Word[] = [...words].map((w: Word, wi: number) => {
        if (wi === newCursorPosition.wordIndex) {
          const letters = [...w.letters].map((l, li) => {
            if (li === newCursorPosition.letterIndex) {
              l.status = LetterStatus.Default;
            }

            return l;
          });

          w.letters = [...letters];

          return w;
        } else {
          return w;
        }
      });

      dispatch(setWords(newWords));

      return;
    }

    // setCursorPosition((prev) => {
    //   return [prev[0], prev[1] + 1];
    // });

    dispatch(
      setCursorPosition([
        cursorPosition.wordIndex,
        cursorPosition.letterIndex + 1,
      ]),
    );

    const newWords: Word[] = [...words].map((w: Word, wi: number) => {
      if (wi === cursorPosition.wordIndex) {
        const letters = [...w.letters].map((l, li) => {
          if (li === cursorPosition.letterIndex) {
            if (e.key === l.content) {
              l.status = LetterStatus.Correct;
            } else if (e.key !== l.content) {
              l.status = LetterStatus.Wrong;
            }
          }

          return l;
        });

        w.letters = [...letters];

        return w;
      } else {
        return w;
      }
    });

    dispatch(setWords(newWords));

    // setWords((prev) => {
    //   return [...prev.map((w: Word, i: number) => {
    //     if(i === cursorPosition[0]) {
    //       return {...w, letters: [letters.]}
    //     }
    //   })];
    // });

    console.log(e);
  };

  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [words, cursorPosition]);

  return (
    // <div className="relative">
    <>
      <WordsList words={words} />
      <Cursor />
    </>

    // </div>
  );
};

export default WriterContainer;
