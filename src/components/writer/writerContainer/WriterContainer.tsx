import Cursor from "../cursor/Cursor";
import useWriter from "../../hooks/useWriter";
import WordsList from "../wordsList/WordsList";

const WriterContainer = () => {
  const { words } = useWriter();

  return (
    <>
      <WordsList words={words} />
      <Cursor />
    </>
  );
};

export default WriterContainer;
