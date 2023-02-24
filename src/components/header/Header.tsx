import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Word from "../../models/Word";
import { resetTimer } from "../../redux/features/timer/timerSlice";
import {
	resetWriter,
	setAllWords,
} from "../../redux/features/writer/writerSlice";
import { getRandomWords } from "../../services/WordsService";

import styles from "./Header.module.scss";

interface IHeaderProps {}

const Header = (props: IHeaderProps) => {
	const dispatch = useDispatch();
	const { timerConfigTime } = useSelector((state: any) => state.config);

	const handleClick = (): void => {
		dispatch(resetTimer(timerConfigTime));
		dispatch(resetWriter());

		const generatedWords: Word[] = getRandomWords();
		dispatch(setAllWords(generatedWords));
	};

	return (
		<div className={styles.header}>
			<span onClick={handleClick}>typeR</span>
		</div>
	);
};

export default Header;
