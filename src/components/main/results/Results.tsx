import React from "react";
import { useDispatch, useSelector } from "react-redux";
import LetterColor from "../../../enums/LetterColor";
import Letter from "../../../models/Letter";
import Word from "../../../models/Word";
import { resetTimer } from "../../../redux/features/timer/timerSlice";
import {
	resetWriter,
	setAllWords,
} from "../../../redux/features/writer/writerSlice";
import { getRandomWords } from "../../../services/WordsService";

interface IResultsProps {}

import styles from "./Results.module.scss";

const Results = (props: IResultsProps) => {
	const dispatch = useDispatch();

	const { allWords, correctKeyStrokes, wrongKeyStrokes, writtenWordsCount } =
		useSelector((state: any) => state.writer);

	const { timerConfigTime } = useSelector((state: any) => state.config);

	const writtenWords: Word[] = allWords.slice(0, writtenWordsCount);

	const wrongWords = writtenWords.filter(
		(w: Word) =>
			w.letters.filter((l: Letter) => l.color === LetterColor.Red)
				.length > 0
	)?.length;

	const correctWords = writtenWords.filter(
		(w: Word) =>
			w.letters.filter((l: Letter) => l.color === LetterColor.Red)
				.length === 0
	)?.length;

	const wpm: number =
		(correctKeyStrokes + wrongKeyStrokes) / 5 / (timerConfigTime / 60);

	const handleClick = (): void => {
		dispatch(resetTimer(timerConfigTime));
		dispatch(resetWriter());

		const generatedWords: Word[] = getRandomWords();
		dispatch(setAllWords(generatedWords));
	};

	return (
		<div className={styles.results}>
			<h2>time is up!</h2>
			<div className={styles.row}>
				<div className={styles.column}>
					<p>wpm</p>
					<p className={styles.value}>{wpm}</p>
				</div>
				<div className={styles.column}>
					<p>acc</p>
					<p className={styles.value}>15%</p>
				</div>
			</div>
			<div className={styles.row}>
				<div className={styles.column}>
					<p>total words:</p>
					<p className={styles.value}>{writtenWords.length}</p>
				</div>
			</div>
			<div className={styles.row}>
				<div className={styles.column}>
					<p>correct words:</p>
					<p className={`${styles.value} ${styles.correct}`}>
						{correctWords}
					</p>
				</div>
				<div className={styles.column}>
					<p>wrong words:</p>
					<p className={`${styles.value} ${styles.wrong}`}>
						{wrongWords}
					</p>
				</div>
			</div>
			<div className={styles.row}>
				<div className={styles.column}>
					<p>keystrokes:</p>
					<p>
						<span className={`${styles.value} ${styles.correct}`}>
							{correctKeyStrokes}
						</span>
						<span>/</span>
						<span className={`${styles.value} ${styles.wrong}`}>
							{wrongKeyStrokes}
						</span>
					</p>
				</div>
			</div>

			<button className={styles.resetButton} onClick={handleClick}>
				Reset
			</button>
		</div>
	);
};

export default Results;
