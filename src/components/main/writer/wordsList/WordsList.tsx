import { nanoid } from "nanoid";
import { memo, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Word from "../../../../models/Word";
import { WriterWord } from "../writerWord/WriterWord";

import styles from "./WordsList.module.scss";

const WordsList = memo(() => {
	const { currentVisibleWords, wordIndex, letterIndex } = useSelector(
		(state: any) => state.writer
	);

	return (
		<div className={styles.wordsListContainer}>
			{currentVisibleWords && currentVisibleWords?.length > 0 && (
				<div className={styles.wordsList}>
					{currentVisibleWords.map((word: Word, wi: number) => (
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
			)}
		</div>
	);
});

export default WordsList;
