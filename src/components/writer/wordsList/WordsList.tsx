import React from "react";
import Word from "../../../models/Word";
import WordComponent from "../word/Word";

import { getRandomWords } from "../../../utils/Utilities";
import { MOST_USED_WORDS } from "../../../utils/words";

const WordsList = () => {
  const randomWords: string[] = getRandomWords(MOST_USED_WORDS, 200);
  const parsedWords: Word[] = randomWords.map((w) => new Word(w));

  const [words, setWords] = React.useState<Word[]>(parsedWords);

  return (
    <div className="flex h-28 w-full flex-wrap gap-2 overflow-hidden text-lightGray">
      {words.map((w: Word, wi: number) => (
        <WordComponent word={w}></WordComponent>
      ))}
    </div>
  );
};

export default WordsList;
