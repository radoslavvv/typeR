import { useEffect, useState } from "react";
import LetterColor from "../enums/LetterColor";
import WordsHelper from "../helpers/WordsHelper";
import Word from "../models/Word";

const useWriter = (
	timerIsStarted: boolean,
	setTimerIsStarted: React.Dispatch<React.SetStateAction<boolean>>
) => {
	const [shiftIsPressed, setShiftIsPressed] = useState<boolean>(false);
	const [words, setWords] = useState<Word[]>([]);
	const [wordIndex, setWordIndex] = useState<number>(0);
	const [letterIndex, setLetterIndex] = useState<number>(0);
	
	useEffect(() => {
		const generatedWords = WordsHelper.getRandomWords();
		setWords(generatedWords);
	}, []);

	const updateLetterColor = (
		color: LetterColor,
		index: number = letterIndex
	): void => {
		setWords((prev: Word[]) => {
			const newWords: Word[] = [...prev];
			newWords[wordIndex].letters[index] = {
				...newWords[wordIndex].letters[index],
				color: color,
			};

			return newWords;
		});
	};

	const deleteLetter = (): void => {
		if (letterIndex === 0 && wordIndex != 0) {
			const newLetterIndex = words[wordIndex - 1]?.letters?.length;
			setLetterIndex(newLetterIndex);

			setWordIndex((prev: number) => {
				return prev - 1;
			});

			return;
		}

		updateLetterColor(LetterColor.Gray, letterIndex - 1);

		setLetterIndex((prev: number) => {
			return Math.max(prev - 1, 0);
		});
	};

	const moveToNextWord = (): void => {
		setWords((prev) => {
			const newWords = [...prev];
			newWords[wordIndex]?.letters?.map((l: any) => {
				if (l.color === LetterColor.Gray) {
					l.color = LetterColor.Red;
				}

				return l;
			});

			return newWords;
		});

		setWordIndex((prev: number) => prev + 1);
		setLetterIndex(0);
	};

	const inputLetter = (pressedKey: string): void => {
		if (letterIndex >= words[wordIndex].letters.length) {
			return;
		}

		if (shiftIsPressed) {
			pressedKey = pressedKey.toUpperCase();
		}

		if (words[wordIndex]?.letters[letterIndex]?.key === pressedKey) {
			updateLetterColor(LetterColor.Green);
		} else {
			updateLetterColor(LetterColor.Red);
		}

		setLetterIndex((prev: number) => prev + 1);
	};

	const handleKeyUp = (e: KeyboardEvent): void => {
		if (!timerIsStarted) {
			setTimerIsStarted(true);
		}

		const pressedKey: string = e.key.toLocaleLowerCase();
		const pressedKeyCode: string = e.code.toLocaleLowerCase();

		if (pressedKey === "backspace") {
			deleteLetter();
			return;
		}

		if (pressedKeyCode === "space") {
			moveToNextWord();
			return;
		}

		if (pressedKey === "shift") {
			setTimeout(() => {
				setShiftIsPressed(false);
			}, 50);
			return;
		}

		inputLetter(pressedKey);
	};

	const handleKeyDown = (e: KeyboardEvent): void => {
		const pressedKey: string = e.key.toLocaleLowerCase();

		if (pressedKey === "shift") {
			setShiftIsPressed(true);
		}
	};

	return {
		words,
		wordIndex,
		letterIndex,
		handleKeyUp,
		handleKeyDown,
	};
};

export default useWriter;
