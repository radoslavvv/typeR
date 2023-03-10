import { useDispatch, useSelector } from "react-redux";

import { WriterWord } from "./writerWord/WriterWord";

import useWriter from "../../../hooks/useWriter";

import Word from "../../../models/Word";

import styles from "./Writer.module.scss";
import useGlobalKeyEvents from "../../../hooks/useGlobalKeyEvents";

import { IoMdRefresh } from "react-icons/io";

import { nanoid } from "@reduxjs/toolkit";
import { resetTimer, stopTimer } from "../../../redux/features/timer/timerSlice";
import { resetWriter, setAllWords } from "../../../redux/features/writer/writerSlice";
import { getRandomWords } from "../../../services/WordsService";
import WordsList from "./wordsList/WordsList";
import { useRef } from "react";

interface IWriterProps {}

const Writer = (props: IWriterProps) => {
  const dispatch = useDispatch();

  const { timerConfigTime } = useSelector((state: any) => state.config);

  const { handleKeyUp, handleKeyDown } = useWriter();

  useGlobalKeyEvents(handleKeyDown, handleKeyUp);

  const handleClick = (): void => {
    dispatch(resetTimer(timerConfigTime));
    dispatch(resetWriter());

    const generatedWords: Word[] = getRandomWords();
    setTimeout(() => {
      dispatch(setAllWords(generatedWords));
    }, 100);
  };

  return (
    <div className={styles.writerContainer}>
      <WordsList />

      <IoMdRefresh className={styles.refreshButton} onClick={handleClick} />
    </div>
  );
};

export default Writer;
