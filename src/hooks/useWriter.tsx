/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import moment from "moment";
import { useSelector } from "react-redux";

import { RootState, useAppDispatch } from "../store/Store";
import {
  setCorrectKeyStrokes,
  setCursorPosition,
  setEndTime,
  setIsFinished,
  setIsRunning,
  setKeyStrokesPerSecond,
  setStartTime,
  setWords,
  setWrongKeyStrokes,
} from "../store/features/WriterSlice";

import Word from "../models/Word";
import Letter from "../models/Letter";
import WriterMode from "../models/enums/WriterMode";
import CursorPosition from "../models/CursorPosition";
import LetterStatus from "../models/enums/LetterStatus";

import {
  getRandomQuote,
  getRandomWords,
  getWordRowIndex,
  hideFinishedRows,
} from "../utils/Utilities";

import { MOST_USED_WORDS } from "../data/words";
import { MOST_FAMOUS_QUOTES } from "../data/quotes";
import { WORDS_PER_SECOND_MULTIPLIER } from "../utils/constants";
import KeyStrokePerSecond from "../models/KeyStrokesPerSecond";

const useWriter = () => {
  const dispatch = useAppDispatch();

  const {
    writerMode,
    wordsCount,
    punctuationIsEnabled,
    numbersAreEnabled,
    secondsCount,
  } = useSelector((state: RootState) => state.settings);

  const {
    words,
    correctKeyStrokes,
    wrongKeyStrokes,
    isFinished,
    isRunning,
    cursorPosition,
    statisticsSeconds,
    keyStrokesPerSecond,
  } = useSelector((state: RootState) => state.writer);

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
    const currentWord: Word = words[cursorPosition.allWordsIndex];
    const currentWordHasUnwrittenWords: boolean = currentWord.letters.some(
      (l: Letter) => l.status === LetterStatus.Default,
    );

    if (currentWordHasUnwrittenWords) {
      return;
    }

    if (
      writerMode === WriterMode.WordCount &&
      !words[cursorPosition.allWordsIndex + 1]
    ) {
      dispatch(setIsRunning(false));
      dispatch(setIsFinished(true));
      dispatch(setEndTime(moment()));
    }

    const rowIndex: number = getWordRowIndex(cursorPosition.allWordsIndex + 1);
    if (rowIndex > cursorPosition.rowIndex) {
      dispatch(
        setCursorPosition([cursorPosition.allWordsIndex + 1, 0, 0, rowIndex]),
      );
      hideFinishedRows(rowIndex);
    } else {
      dispatch(
        setCursorPosition([
          cursorPosition.allWordsIndex + 1,
          cursorPosition.currentRowWordIndex + 1,
          0,
          rowIndex,
        ]),
      );
    }
  };
  const handleBackspacePress = () => {
    let newCursorPosition: CursorPosition = new CursorPosition(0, 0, 0, 0);
    if (cursorPosition.letterIndex === 0) {
      const previousWord: Word = words[cursorPosition.allWordsIndex - 1];
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

      const previousWordRowIndex: number = getWordRowIndex(
        cursorPosition.allWordsIndex - 1,
      );

      const newRowIndex: number =
        previousWordRowIndex < cursorPosition.rowIndex
          ? previousWordRowIndex
          : cursorPosition.rowIndex;

      newCursorPosition = new CursorPosition(
        Math.max(cursorPosition.allWordsIndex - 1, 0),
        Math.max(cursorPosition.currentRowWordIndex - 1, 0),
        words[Math.max(cursorPosition.allWordsIndex - 1, 0)].letters.length,
        newRowIndex,
      );
    } else {
      newCursorPosition = new CursorPosition(
        cursorPosition.allWordsIndex,
        cursorPosition.currentRowWordIndex,
        Math.max(cursorPosition.letterIndex - 1, 0),
        cursorPosition.rowIndex,
      );
    }

    dispatch(
      setCursorPosition([
        newCursorPosition.allWordsIndex,
        newCursorPosition.currentRowWordIndex,
        newCursorPosition.letterIndex,
        newCursorPosition.rowIndex,
      ]),
    );

    const newWords: Word[] = getNewWordsAfterBackspacePress(
      words,
      newCursorPosition.allWordsIndex,
      newCursorPosition.letterIndex,
    );

    dispatch(setWords(newWords));
  };
  const handleTextKeyPress = (e: KeyboardEvent, keyIsUppercase: boolean) => {
    if (!isRunning) {
      dispatch(setIsRunning(true));
      dispatch(setIsFinished(false));
      dispatch(setStartTime(moment()));
    }

    const currentWord: Word = words[cursorPosition.allWordsIndex];

    const nextLetterIsOutOfBounds: boolean =
      cursorPosition.letterIndex + 1 > currentWord.letters.length;
    if (nextLetterIsOutOfBounds) {
      return;
    }

    dispatch(
      setCursorPosition([
        cursorPosition.allWordsIndex,
        cursorPosition.currentRowWordIndex,
        cursorPosition.letterIndex + 1,
        cursorPosition.rowIndex,
      ]),
    );

    const pressedKey: string = keyIsUppercase ? e.key.toUpperCase() : e.key;
    const newWords: Word[] = getNewWordsAfterKeyPress(
      words,
      cursorPosition.allWordsIndex,
      pressedKey,
    );

    dispatch(setWords(newWords));

    if (
      cursorPosition.letterIndex === currentWord.letters.length - 1 &&
      cursorPosition.allWordsIndex === words.length - 1 &&
      !newWords[cursorPosition.allWordsIndex].letters.some(
        (l: Letter) => l.status === LetterStatus.Wrong,
      )
    ) {
      dispatch(setIsRunning(false));
      dispatch(setIsFinished(true));
      dispatch(setEndTime(moment()));
    }
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.code === "Space") {
      handleSpacePress();
      return;
    } else if (e.code === "Backspace") {
      handleBackspacePress();
      return;
    } else if (e.key.length === 1) {
      const keyIsUppercase: boolean = e.shiftKey;
      handleTextKeyPress(e, keyIsUppercase);
    }
  };

  const generateWords = () => {
    let randomWords: string[] = [];
    if (writerMode === WriterMode.Quote) {
      randomWords = getRandomQuote(MOST_FAMOUS_QUOTES);
    } else {
      const neededWordsCount: number =
        writerMode === WriterMode.Time
          ? secondsCount * WORDS_PER_SECOND_MULTIPLIER
          : wordsCount;

      randomWords = getRandomWords(
        MOST_USED_WORDS,
        neededWordsCount,
        punctuationIsEnabled,
        numbersAreEnabled,
      );
    }

    const parsedWords: Word[] = randomWords.map((w) => new Word(w));

    dispatch(setWords(parsedWords));
  };

  React.useEffect(() => {
    if (!isRunning && words.length === 0) {
      generateWords();
    }
  }, [isRunning, words]);

  React.useEffect(() => {
    generateWords();
  }, [
    wordsCount,
    writerMode,
    punctuationIsEnabled,
    numbersAreEnabled,
    secondsCount,
  ]);

  React.useEffect(() => {
    const currentKeyStrokesPerSecond: KeyStrokePerSecond =
      new KeyStrokePerSecond(
        correctKeyStrokes + wrongKeyStrokes,
        statisticsSeconds,
      );
    if (
      !keyStrokesPerSecond.some(
        (kps: KeyStrokePerSecond) => kps.second === statisticsSeconds,
      )
    ) {
      dispatch(setKeyStrokesPerSecond(currentKeyStrokesPerSecond));
    }
  }, [correctKeyStrokes, wrongKeyStrokes]);

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
    isRunning,
    isFinished,
  };
};

export default useWriter;
