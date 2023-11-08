import useWriter from "../../../hooks/useWriter";
import WriterMode from "../../../models/enums/WriterMode";
import WordCounter from "../../countdown/wordCounter/WordCounter";
import SettingsToolbar from "../../settingsToolbar/SettingsToolbar";
import Cursor from "../cursor/Cursor";
import WordsList from "../wordsList/WordsList";
import Word from "../../../models/Word";
import ResetButton from "../resetButton/ResetButton";
import Timer from "../../countdown/timer/Timer";

const WriterContainer = () => {
  const { writerMode, words } = useWriter();

  const rawWords: string[] = words.map((w: Word) => w.content);

  return (
    <>
      <SettingsToolbar />

      <div
        key={JSON.stringify(rawWords)}
        className="mt-20 flex animate-fadeIn flex-col justify-start md:mt-52"
      >
        {(writerMode === WriterMode.WordCount ||
          writerMode === WriterMode.Quote) && <WordCounter />}
        {writerMode === WriterMode.Time && <Timer />}

        <WordsList words={words} />
        <Cursor />
      </div>

      <ResetButton />
    </>
  );
};

export default WriterContainer;
