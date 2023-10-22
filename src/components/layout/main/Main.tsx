import React from "react";
import Word from "../../../models/Word";
import Letter from "../../../models/Letter";
import LetterStatus from "../../../models/LetterStatus";

import { MOST_USED_WORDS } from "../../../utils/words";
import { getRandomWords, shuffleArray } from "../../../utils/Utilities";
import WordsList from "../../writer/wordsList/WordsList";

const Main = () => {
  // const randomWords: string[] = getRandomWords(MOST_USED_WORDS, 200);
  // const parsedWords: Word[] = randomWords.map((w) => new Word(w));

  // const [words, setWords] = React.useState<Word[]>(parsedWords);

  // const [cursorPosition, setCursorPosition] = React.useState([0, 0]);

  // const [writtenWord, setWrittenWord] = React.useState<string>("");
  // const [neededWord, setNeededWord] = React.useState<string>(
  //   parsedWords[0].content,
  // );

  // const handleKeyPress = (e: KeyboardEvent) => {
  //   if (e.code === "Space") {
  //     setCursorPosition((prev) => {
  //       return [prev[0] + 1, 0];
  //     });

  //     setNeededWord(parsedWords[cursorPosition[0] + 1].content);
  //     return;
  //   }

  //   setWrittenWord((prev) => {
  //     return prev + e.key;
  //   });

  //   setCursorPosition((prev) => {
  //     return [prev[0], prev[1] + 1];
  //   });

  //   // setWords((prev) => {
  //   //   return [...prev.map((w: Word, i: number) => {
  //   //     if(i === cursorPosition[0]) {
  //   //       return {...w, letters: [letters.]}
  //   //     }
  //   //   })];
  //   // });

  //   console.log(e);
  // };

  // React.useEffect(() => {
  //   document.addEventListener("keydown", handleKeyPress);

  //   return () => {
  //     document.removeEventListener("keydown", handleKeyPress);
  //   };
  // }, []);

  return <WordsList />;
};

export default Main;
