/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import {
  setCorrectKeyStrokes,
  setCursorPosition,
  setIsFinished,
  setWords,
  setWrongKeyStrokes,
} from "../store/features/WordsSlice";
import LetterStatus from "../models/enums/LetterStatus";
import Word from "../models/Word";
import CursorPosition from "../models/CursorPosition";
import { getRandomWords } from "../utils/Utilities";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../store/Store";
import { MOST_USED_WORDS } from "../utils/words";
import Letter from "../models/Letter";
import WriterMode from "../models/enums/WriterMode";

const useWriter = () => {
  const dispatch = useAppDispatch();

  const writerMode: WriterMode = useSelector(
    (state: RootState) => state.settings.writerMode,
  );
  const wordsCount: number = useSelector(
    (state: RootState) => state.settings.wordsCount,
  );
  const punctuationIsEnabled: boolean = useSelector(
    (state: RootState) => state.settings.punctuationIsEnabled,
  );
  const numbersAreEnabled: boolean = useSelector(
    (state: RootState) => state.settings.numbersAreEnabled,
  );

  const cursorPosition: CursorPosition = useSelector(
    (state: RootState) => state.words.cursorPosition,
  );

  const words: Word[] = useSelector((state: RootState) => state.words.words);

  const correctKeyStrokes: number = useSelector(
    (state: RootState) => state.words.correctKeyStrokes,
  );
  const wrongKeyStrokes: number = useSelector(
    (state: RootState) => state.words.wrongKeyStrokes,
  );
  const allKeyStrokes: number = correctKeyStrokes + wrongKeyStrokes;

  const getNewWordsAfterBackspacePress = (
    words: Word[],
    wordIndex: number,
    letterIndex: number,
  ): Word[] => {
    return [...words].map((w: Word, wi: number) => {
      if (wi === wordIndex) {
        const letters = [...w.letters].map((l, li) => {
          if (li === letterIndex) {
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
  };
  const getNewWordsAfterKeyPress = (
    words: Word[],
    wordIndex: number,
    keyPressValue: string,
  ): Word[] => {
    return [...words].map((w: Word, wi: number) => {
      if (wi === wordIndex) {
        const letters = [...w.letters].map((l, li) => {
          if (li === cursorPosition.letterIndex) {
            if (keyPressValue === l.content) {
              l.status = LetterStatus.Correct;
              dispatch(setCorrectKeyStrokes(correctKeyStrokes + 1));
            } else if (keyPressValue !== l.content) {
              l.status = LetterStatus.Wrong;
              dispatch(setWrongKeyStrokes(wrongKeyStrokes + 1));
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
  };

  const handleSpacePress = () => {
    const currentWord: Word = words[cursorPosition.wordIndex];
    const currentWordHasUnwrittenWords: boolean = currentWord.letters.some(
      (l: Letter) => l.status === LetterStatus.Default,
    );

    if (currentWordHasUnwrittenWords) {
      return;
    }

    if (
      writerMode === WriterMode.WordCount &&
      !words[cursorPosition.wordIndex + 1]
    ) {
      dispatch(setIsFinished(true));
      return;
    }

    dispatch(setCursorPosition([cursorPosition.wordIndex + 1, 0]));
  };
  const handleBackspacePress = () => {
    let newCursorPosition: CursorPosition = new CursorPosition(0, 0);
    if (cursorPosition.letterIndex === 0) {
      const previousWord: Word = words[cursorPosition.wordIndex - 1];
      const previousWordIsCorrect: boolean =
        previousWord &&
        !previousWord.letters.some(
          (l: Letter) =>
            l.status === LetterStatus.Wrong ||
            l.status === LetterStatus.Default,
        );

      if (previousWordIsCorrect) {
        return;
      }

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

    const newWords: Word[] = getNewWordsAfterBackspacePress(
      words,
      newCursorPosition.wordIndex,
      newCursorPosition.letterIndex,
    );

    dispatch(setWords(newWords));
  };
  const handleTextKeyPress = (e: KeyboardEvent) => {
    const currentWord: Word = words[cursorPosition.wordIndex];

    const nextLetterIsOutOfBounds: boolean =
      cursorPosition.letterIndex + 1 > currentWord.letters.length;
    if (nextLetterIsOutOfBounds) {
      return;
    }

    dispatch(
      setCursorPosition([
        cursorPosition.wordIndex,
        cursorPosition.letterIndex + 1,
      ]),
    );

    const newWords: Word[] = getNewWordsAfterKeyPress(
      words,
      cursorPosition.wordIndex,
      e.key,
    );

    dispatch(setWords(newWords));
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.code === "Space") {
      handleSpacePress();
      return;
    } else if (e.code === "Backspace") {
      handleBackspacePress();
      return;
    } else {
      handleTextKeyPress(e);
    }
  };

  React.useEffect(() => {
    const randomWords: string[] = getRandomWords(MOST_USED_WORDS, wordsCount);
    const parsedWords: Word[] = randomWords.map((w) => new Word(w));

    dispatch(setWords(parsedWords));
  }, [wordsCount, writerMode, punctuationIsEnabled, numbersAreEnabled]);

  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [
    words,
    cursorPosition,
    handleSpacePress,
    handleBackspacePress,
    handleTextKeyPress,
  ]);

  return {
    words,
    correctKeyStrokes,
    wrongKeyStrokes,
    allKeyStrokes,
    writerMode,
  };
};

export default useWriter;
