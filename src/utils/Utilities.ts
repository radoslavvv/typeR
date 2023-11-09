import KeyStrokePerSecond from "../models/KeyStrokesPerSecond";
import StatisticsItem from "../models/StatisticsItem";
import { SECONDS_IN_MINUTE } from "./constants";

export const getRandomWords = (
  wordsArray: string[],
  wordsCount: number,
  punctuationIsEnabled: boolean,
  numbersAreEnabled: boolean,
): string[] => {
  let randomWords: string[] = [];

  if (!punctuationIsEnabled) {
    randomWords = generateLetterRandomWords(wordsArray, wordsCount);
  } else if (punctuationIsEnabled) {
    randomWords = generatePunctuationRandomWords(wordsArray, wordsCount);
  }

  if (numbersAreEnabled) {
    randomWords = addNumbersToRandomWords(randomWords);
  }

  console.log(randomWords);
  return randomWords;
};

export const getRandomQuote = (quotesArray: string[]): string[] => {
  const randomQuoteIndex: number = generateRandomInteger(
    0,
    quotesArray.length - 1,
  );

  const quote: string = quotesArray[randomQuoteIndex];
  return quote.split(" ");
};

const generateLetterRandomWords = (
  wordsArray: string[],
  wordsCount: number,
): string[] => {
  const randomWords: string[] = [];

  for (let i = 0; i < wordsCount; i++) {
    const randomWordIndex: number = generateRandomInteger(
      0,
      wordsArray.length - 1,
    );

    const currentWord = wordsArray[randomWordIndex];
    randomWords.push(currentWord);
  }

  return randomWords;
};
const generatePunctuationRandomWords = (
  wordsArray: string[],
  wordsCount: number,
) => {
  let randomWords: string[] = [];

  let remainingWordsCount: number = wordsCount;

  while (remainingWordsCount > 0) {
    const currentSentenceWordsCount: number = Math.min(
      generateRandomInteger(1, 10),
      remainingWordsCount,
    );

    const currentSentenceWords: string[] = [];
    for (let i = 0; i < currentSentenceWordsCount; i++) {
      const randomWordIndex: number = generateRandomInteger(
        0,
        wordsArray.length - 1,
      );

      const currentWord = wordsArray[randomWordIndex];
      currentSentenceWords.push(currentWord);
    }

    const currentSentence: string =
      generateRandomSentence(currentSentenceWords);

    randomWords = [...randomWords, ...currentSentence.split(" ")];

    remainingWordsCount -= currentSentence.split(" ").length;
  }

  return randomWords;
};
const addNumbersToRandomWords = (wordsArray: string[]) => {
  const newWordsArray: string[] = [...wordsArray];

  const numbersCount: number = generateRandomInteger(
    newWordsArray.length / 3,
    newWordsArray.length / 2,
  );
  for (let i = 0; i < numbersCount; i++) {
    const randomWordIndex: number = generateRandomInteger(
      0,
      newWordsArray.length - 2,
    );

    const randomNumber: number = generateRandomInteger(0, 150);

    newWordsArray[randomWordIndex] = randomNumber.toString();
  }

  return newWordsArray;
};
const generateRandomSentence = (wordsArray: string[]): string => {
  const sentenceEndPunctuationMarks: string[] = [".", "!", "?"];
  let dummyText: string = "";

  const sentence = wordsArray
    .map((word, index) => {
      if (index === 0) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      } else if (index % 3 === 0 && index != wordsArray.length - 1) {
        return word + ",";
      } else {
        return word;
      }
    })
    .join(" ");

  const randomSentenceEndPunctuation: string =
    sentenceEndPunctuationMarks[
      Math.floor(Math.random() * sentenceEndPunctuationMarks.length)
    ];
  dummyText += `${sentence}${randomSentenceEndPunctuation}`;

  return dummyText.trim();
};

export const generateRandomInteger = (
  minNumber: number,
  maxNumber: number,
): number => {
  return Math.floor(minNumber + Math.random() * (maxNumber - minNumber + 1));
};

export const getWordWidth = (word: string): number => {
  const canvas = document.createElement("canvas");

  const context = canvas.getContext("2d");
  if (context) {
    context.font = `1.6rem Roboto Slab`;

    const textMetrics = context.measureText(word);
    return textMetrics.width;
  }

  return 0;
};

export const getWordRowIndex = (wordIndex: number): number => {
  const nextWordElement: Element =
    document.querySelectorAll(".wordsList .word")[wordIndex];
  const rowIndex: number = Number(
    nextWordElement.getAttribute("row-index") || "",
  );

  return rowIndex;
};

export const hideFinishedRows = (currentRowIndex: number): void => {
  const rowElements: NodeListOf<HTMLElement> =
    document.querySelectorAll(".wordsList .row");

  for (let i = currentRowIndex - 2; i < currentRowIndex - 1; i++) {
    rowElements[i].style.display = "none";
  }
};

export const generateStatisticsItems = (
  keyStrokesPerSecond: KeyStrokePerSecond[],
): StatisticsItem[] => {
  const statisticsItems: StatisticsItem[] = [];

  for (let i = 0; i < keyStrokesPerSecond.length; i++) {
    const current: KeyStrokePerSecond = keyStrokesPerSecond[i];

    if (current.second === 0) {
      continue;
    }

    const wordsPerMinute: number = Math.floor(
      current.keyStrokes / 5 / (current.second / SECONDS_IN_MINUTE),
    );

    const newStatisticsItem: StatisticsItem = new StatisticsItem(
      wordsPerMinute,
      current.second,
    );

    statisticsItems.push(newStatisticsItem);
  }

  return statisticsItems;
};
