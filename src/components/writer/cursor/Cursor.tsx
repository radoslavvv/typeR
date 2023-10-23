import { useSelector } from "react-redux";
import CursorPosition from "../../../models/CursorPosition";
import { RootState } from "../../../store/Store";
import React from "react";

const Cursor = () => {
  const cursorPosition: CursorPosition = useSelector(
    (state: RootState) => state.words.cursorPosition,
  );

  const wordsListElement: Element = document.querySelectorAll(".wordsList")[0];
  const currentActiveWordElement: Element =
    document.querySelectorAll(".wordsList > div")[cursorPosition.wordIndex];

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

  React.useEffect(() => {}, [cursorPosition]);

  return (
    <span
      className="absolute h-6 rounded-full border border-solid border-lightBlue duration-100"
      style={{ top: cursorTop + 5, left: cursorLeft - 3 }}
    ></span>
  );
};

export default Cursor;
