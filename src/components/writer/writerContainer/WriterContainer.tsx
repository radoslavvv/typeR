import useWriter from "../../../hooks/useWriter";
import WriterMode from "../../../models/enums/WriterMode";
import WordCounter from "../../countdown/wordCounter/WordCounter";
import Settings from "../../settings/Settings";
import Cursor from "../cursor/Cursor";
import WordsList from "../wordsList/WordsList";

const WriterContainer = () => {
  const { writerMode, words } = useWriter();

  return (
    <>
      <Settings />
      <div className=" flex flex-col justify-center">
        {writerMode === WriterMode.WordCount && <WordCounter />}
        <WordsList words={words} />
        <Cursor />
      </div>
    </>
  );
};

export default WriterContainer;
