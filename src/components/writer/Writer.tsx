import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useGlobalKeyEvents } from "../../hooks/useGlobalKeyEvents";
import usePagedWords from "../../hooks/usePagedWords";
import useStatistics from "../../hooks/useStatistics";
import useWriter from "../../hooks/useWriter";

import Word from "../../models/Word";

import { WriterWord } from "../writerWord/WriterWord";

import styles from "./Writer.module.scss";

interface IWriterProps {
	timerIsStarted: boolean;
	setTimerIsStarted: React.Dispatch<React.SetStateAction<boolean>>;
}

const Writer = (props: IWriterProps) => {
	const { words, wordIndex, letterIndex, handleKeyUp, handleKeyDown } =
		useWriter(props.timerIsStarted, props.setTimerIsStarted);

	useGlobalKeyEvents(handleKeyUp, handleKeyDown);

	// const { keyStrokes } = useStatistics();
	return (
		<div className={styles.writerContainer}>
			<div className={styles.wordsList}>
				{words?.length &&
					words.map((word: Word, wi: number) => (
						<WriterWord
							key={wi}
							isCurrentWord={wi === wordIndex}
							letterIndex={letterIndex}
							word={word}
							isLastLetter={
								letterIndex === words[wordIndex].letters.length
							}
						/>
					))}
			</div>
		</div>
	);
};

export default Writer;
