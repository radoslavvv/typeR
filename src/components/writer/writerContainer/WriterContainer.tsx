import useWriter from "../../../hooks/useWriter";
import WriterMode from "../../../models/enums/WriterMode";
import WordCounter from "../../countdown/wordCounter/WordCounter";
import Settings from "../../settings/Settings";
import Cursor from "../cursor/Cursor";
import WordsList from "../wordsList/WordsList";
import Word from "../../../models/Word";

const WriterContainer = () => {
  const { writerMode, words } = useWriter();

  const rawWords: string[] = words.map((w: Word) => w.content);

  return (
    <>
      <Settings />

      <div
        key={JSON.stringify(rawWords)}
        className="animate-fadeIn flex flex-col justify-center"
      >
        {writerMode === WriterMode.WordCount && <WordCounter />}
        <WordsList words={words} />
        <Cursor />
      </div>
    </>
  );
};

export default WriterContainer;
