import React, { useEffect, useMemo, useRef, useState } from "react";
import { useGlobalKeyEvents } from "../../hooks/useGlobalKeyEvents";
import { usePagedWords } from "../../hooks/usePagedWords";
import useWriter from "../../hooks/useWriter";
import Letter from "../../models/Letter";
import Word from "../../models/Word";

import { WORDS_PER_PAGE } from "../../utils/constants";
import { Cursor } from "../cursor/Cursor";
import { WriterWord } from "../writerWord/WriterWord";

import styles from "./Writer.module.scss";

interface IWriterProps {
	timerIsStarted: boolean;
	setTimerIsStarted: React.Dispatch<React.SetStateAction<boolean>>;
}

const Writer = (props: IWriterProps) => {
	const {
		words,
		wordIndex,
		letterIndex,
		handleKeyUp,
		handleKeyDown,
	} = useWriter(props.timerIsStarted, props.setTimerIsStarted);

	const wordsPage = usePagedWords(words, wordIndex);

	useGlobalKeyEvents(handleKeyUp, handleKeyDown);
	
	return (
		<div className={styles.writerContainer}>
			<div className={styles.wordsList}>
				{wordsPage?.length &&
					wordsPage
						.map((word: Word, wi: number) => (
							<WriterWord 
								key={wi} 
								isCurrentWord={wi === wordIndex} 
								letterIndex={letterIndex}
								word={word}
								isLastLetter={letterIndex === words[wordIndex].letters.length}/>
						))}
			</div>
		</div>
	);
};

export default Writer;
