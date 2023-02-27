import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { startTimer } from "../redux/features/timer/timerSlice";
import {
	deleteCurrentLetter,
	moveToNextLetter,
	moveToNextPage,
	moveToNextWord,
	setAllWords,
	setShiftIsPressed,
	setCurrentLetterColor,
} from "../redux/features/writer/writerSlice";

import LetterColor from "../enums/LetterColor";

import { getRandomWords } from "../services/WordsService";

const useWriter = () => {
	const dispatch = useDispatch();
	const { timerIsStarted } = useSelector((state: any) => state.timer);

	const { currentVisibleWords, letterIndex, wordIndex, shiftIsPressed } =
		useSelector((state: any) => state.writer);

	useEffect(() => {
		const generatedWords = getRandomWords();
		dispatch(setAllWords(generatedWords));
	}, []);

	const handleDeleteLetter = (): void => {
		debugger;
		dispatch(deleteCurrentLetter());
		dispatch(setCurrentLetterColor(LetterColor.Gray));
	};

	const handleMoveToNextWord = (): void => {
		console.log("move to next word");
		// if (wordIndex + 1 === currentVisibleWords.length) {
		// 	dispatch(moveToNextPage());
		// 	return;
		// }

		dispatch(moveToNextWord());
	};

	const handleLetterInput = (pressedKey: string): void => {
		if (letterIndex >= currentVisibleWords[wordIndex].letters.length) {
			return;
		}

		if (shiftIsPressed) {
			pressedKey = pressedKey.toUpperCase();
		}

		if (
			currentVisibleWords[wordIndex]?.letters[letterIndex]?.key ===
			pressedKey
		) {
			dispatch(setCurrentLetterColor(LetterColor.Green));
		} else {
			dispatch(setCurrentLetterColor(LetterColor.Red));
		}

		dispatch(moveToNextLetter());
	};

	const handleKeyUp = (e: KeyboardEvent): void => {
		if (!timerIsStarted) {
			dispatch(startTimer());
		}

		const pressedKey: string = e.key.toLocaleLowerCase();
		const pressedKeyCode: string = e.code.toLocaleLowerCase();

		if (pressedKey === "backspace") {
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

		if (pressedKey === "backspace") {
			handleDeleteLetter();
			return;
		}
	};

	return {
		handleKeyUp,
		handleKeyDown,
	};
};

export default useWriter;
