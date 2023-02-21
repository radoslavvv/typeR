import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LetterColor from "../enums/LetterColor";
import { startTimer } from "../redux/features/timer/timerSlice";
import {
	deleteCurrentLetter,
	moveToNextLetter,
	moveToNextPage,
	moveToNextWord,
	setAllWords,
	setShiftIsPressed,
	setWords,
	updateCurrentLetterColor,
} from "../redux/features/writer/writerSlice";
import { getRandomWords } from "../services/WordsService";
import { WORDS_PER_PAGE } from "../utils/constants";

const useWriter = () => {
	const dispatch = useDispatch();
	const { isStarted } = useSelector((state: any) => state.timer);

	const { words, letterIndex, wordIndex, shiftIsPressed } = useSelector(
		(state: any) => state.writer
	);

	useEffect(() => {
		const generatedWords = getRandomWords();

		dispatch(setAllWords(generatedWords));
		dispatch(setWords([...generatedWords.slice(0, WORDS_PER_PAGE)]));
	}, []);

	const handleDeleteLetter = (): void => {
		dispatch(deleteCurrentLetter());
		dispatch(updateCurrentLetterColor(LetterColor.Gray));
	};

	const handleMoveToNextWord = (): void => {
		if (wordIndex + 1 === words.length) {
			dispatch(moveToNextPage());
			return;
		}

		dispatch(moveToNextWord());
	};

	const handleLetterInput = (pressedKey: string): void => {
		if (letterIndex >= words[wordIndex].letters.length) {
			return;
		}

		if (shiftIsPressed) {
			pressedKey = pressedKey.toUpperCase();
		}

		if (words[wordIndex]?.letters[letterIndex]?.key === pressedKey) {
			dispatch(updateCurrentLetterColor(LetterColor.Green));
		} else {
			dispatch(updateCurrentLetterColor(LetterColor.Red));
		}

		dispatch(moveToNextLetter());
	};

	const handleKeyUp = (e: KeyboardEvent): void => {
		if (!isStarted) {
			dispatch(startTimer());
		}

		const pressedKey: string = e.key.toLocaleLowerCase();
		const pressedKeyCode: string = e.code.toLocaleLowerCase();

		if (pressedKey === "backspace") {
			handleDeleteLetter();
			return;
		}

		if (pressedKeyCode === "space") {
			handleMoveToNextWord();
			return;
		}

		if (pressedKey === "shift") {
			setTimeout(() => {
				dispatch(setShiftIsPressed(false));
			}, 50);

			return;
		}

		handleLetterInput(pressedKey);
	};

	const handleKeyDown = (e: KeyboardEvent): void => {
		const pressedKey: string = e.key.toLocaleLowerCase();

		if (pressedKey === "shift") {
			dispatch(setShiftIsPressed(true));
		}
	};

	return {
		handleKeyUp,
		handleKeyDown,
	};
};

export default useWriter;
