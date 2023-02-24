import { useSelector } from "react-redux";

import { WriterWord } from "./writerWord/WriterWord";

import useWriter from "../../../hooks/useWriter";

import Word from "../../../models/Word";

import styles from "./Writer.module.scss";
import useGlobalKeyEvents from "../../../hooks/useGlobalKeyEvents";
import Letter from "../../../models/Letter";
import LetterColor from "../../../enums/LetterColor";
import { nanoid } from "@reduxjs/toolkit";

interface IWriterProps {}

const Writer = (props: IWriterProps) => {
	const { currentVisibleWords, wordIndex, letterIndex } = useSelector(
		(state: any) => state.writer
	);

	const { handleKeyUp, handleKeyDown } = useWriter();

	useGlobalKeyEvents(handleKeyUp, handleKeyDown);

	return (
		<div className={styles.writerContainer}>
			<div className={styles.wordsList}>
				{currentVisibleWords?.length &&
					currentVisibleWords.map((word: Word, wi: number) => (
						<WriterWord
							key={nanoid()}
							isCurrentWord={wi === wordIndex}
							letterIndex={letterIndex}
							word={word}
							isLastLetter={
								letterIndex ===
								currentVisibleWords[wordIndex].letters.length
							}
						/>
					))}
			</div>
		</div>
	);
};

export default Writer;
