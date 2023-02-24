import React from "react";
import { useSelector } from "react-redux";
import LetterColor from "../../../enums/LetterColor";
import Letter from "../../../models/Letter";
import Word from "../../../models/Word";

interface IResultsSectionProps {}

import styles from "./ResultsSections.module.scss";

const ResultsSection = (props: IResultsSectionProps) => {
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

	const wpm: number = writtenWordsCount / (timerConfigTime / 60);

	return (
		<div className={styles.resultsSection}>
			<p>Time is up!</p>
			<h1>WPM: {wpm}</h1>
			<p>Correct Words: {correctWords}</p>
			<p>Wrong Words: {wrongWords}</p>
			<p>
				Key Strokes: {correctKeyStrokes}/{wrongKeyStrokes}
			</p>
		</div>
	);
};

export default ResultsSection;
