import { useSelector } from "react-redux";

import { WriterWord } from "../writerWord/WriterWord";

import useWriter from "../../hooks/useWriter";
import { useGlobalKeyEvents } from "../../hooks/useGlobalKeyEvents";

import Word from "../../models/Word";

import styles from "./Writer.module.scss";

interface IWriterProps {}

const Writer = (props: IWriterProps) => {
	const { words, wordIndex, letterIndex } = useSelector(
		(state: any) => state.writer
	);

	const { handleKeyUp, handleKeyDown } = useWriter();

	useGlobalKeyEvents(handleKeyUp, handleKeyDown);

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
