import Word from "../../../models/Word";
import WordComponent from "../word/Word";

interface IWordsListProps {
  words: Word[];
}

const WordsList = ({ words }: IWordsListProps) => {
  return (
    <div className="wordsList flex h-28 w-full flex-wrap content-baseline gap-2 overflow-hidden text-lightGray">
      {words.map((w: Word, wi: number) => (
        <WordComponent word={w} wordIndex={wi}></WordComponent>
      ))}
    </div>
  );
};

export default WordsList;
