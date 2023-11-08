import { useSelector } from "react-redux";

import { RootState } from "../store/Store";

import CursorPosition from "../models/CursorPosition";

const useCursor = () => {
  const cursorPosition: CursorPosition = useSelector(
    (state: RootState) => state.words.cursorPosition,
  );

  const wordsListElement: Element = document.querySelectorAll(".wordsList")[0];
  const currentActiveWordElement: Element =
    document.querySelectorAll(".wordsList .word")[cursorPosition.allWordsIndex];

  let cursorTop: number = 0;
  let cursorLeft: number = 0;

  const getElementPositionData = (element: Element): number[] => {
    const { top, left, width } = element.getBoundingClientRect();

    return [top, left, width];
  };

  if (currentActiveWordElement) {
    const currentWordLetters: NodeListOf<HTMLSpanElement> =
      currentActiveWordElement.querySelectorAll("span");

    const currentLetter = currentWordLetters[cursorPosition.letterIndex];
    const lastLetter = currentWordLetters[currentWordLetters.length - 1];

    if (currentLetter) {
      const [topValue, leftValue] = getElementPositionData(currentLetter);

      cursorTop = topValue;
      cursorLeft = leftValue;
    } else {
      const [topValue, leftValue, width] = getElementPositionData(lastLetter);

      cursorTop = topValue;
      cursorLeft = leftValue + width;
    }
  } else if (wordsListElement) {
    const [topValue, leftValue] = getElementPositionData(wordsListElement);
    cursorTop = topValue;
    cursorLeft = leftValue;
  }

  cursorTop += 7;
  cursorLeft -= 3;

  return { cursorTop, cursorLeft, cursorPosition };
};

export default useCursor;
