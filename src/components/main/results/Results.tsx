import React from "react";
import { useDispatch, useSelector } from "react-redux";
import LetterColor from "../../../enums/LetterColor";
import Letter from "../../../models/Letter";
import Word from "../../../models/Word";
import { resetTimer } from "../../../redux/features/timer/timerSlice";
import { resetWriter, setAllWords } from "../../../redux/features/writer/writerSlice";
import { getRandomWords } from "../../../services/WordsService";

import useGlobalKeyEvents from "../../../hooks/useGlobalKeyEvents";

interface IResultsProps {}

import styles from "./Results.module.scss";
import { IoMdRefresh } from "react-icons/io";

const Results = (props: IResultsProps) => {
  const dispatch = useDispatch();

  const { allWords, correctKeyStrokes, wrongKeyStrokes, writtenWordsCount } = useSelector((state: any) => state.writer);

  const { timerConfigTime } = useSelector((state: any) => state.config);

  const writtenWords: Word[] = allWords.slice(0, writtenWordsCount);

  const wrongWords = writtenWords.filter((w: Word) => w.letters.filter((l: Letter) => l.color === LetterColor.Red).length > 0)?.length;

  const correctWords = writtenWords.filter((w: Word) => w.letters.filter((l: Letter) => l.color === LetterColor.Red).length === 0)?.length;

  const wpm: number = Math.ceil((correctKeyStrokes + wrongKeyStrokes) / 5 / (timerConfigTime / 60));

  const accuracy: number = Math.round((correctKeyStrokes / (correctKeyStrokes + wrongKeyStrokes)) * 100 || 0);

  const reset = (): void => {
    dispatch(resetTimer(timerConfigTime));
    dispatch(resetWriter());

    const generatedWords: Word[] = getRandomWords();
    setTimeout(() => {
      dispatch(setAllWords(generatedWords));
    }, 100);
  };

  const handleClick = (): void => {
    reset();
  };

  return (
    <div className={styles.results}>
      <h2>time is up!</h2>
      <div className={`${styles.row} `}>
        <div className={`${styles.column} ${styles.wpmCol}`}>
          <p className={`${styles.value} ${styles.wpm}`}>{wpm}</p>
          <p>wpm</p>
        </div>
      </div>
      <div className={`${styles.row} ${styles.statisticsRow}`}>
        <div className={styles.column}>
          <p>
            <span className={`${styles.value} ${styles.correct}`}>{correctWords}</span>
            <span>/</span>
            <span className={`${styles.value} ${styles.wrong}`}>{wrongWords}</span>
          </p>
          <p>words</p>
        </div>
        <div className={`${styles.column} ${styles.accCol}`}>
          <p>accuracy</p>
          <p className={styles.value}>{accuracy}%</p>
        </div>
        <div className={styles.column}>
          <p>
            <span className={`${styles.value} ${styles.correct}`}>{correctKeyStrokes}</span>
            <span>/</span>
            <span className={`${styles.value} ${styles.wrong}`}>{wrongKeyStrokes}</span>
          </p>
          <p>characters</p>
        </div>
      </div>

      <button className={styles.resetButton} onClick={handleClick}>
        <IoMdRefresh />
        reset
      </button>
    </div>
  );
};

export default Results;
