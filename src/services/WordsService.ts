import words from "../data/words";
import Letter from "../models/Letter";
import Word from "../models/Word";

const generateRandomWordsArray = (): string[] => {
	let selectedWords: string[] = [];

	for (let i = 0; i < 300; i++) {
		const randomNumber = Math.floor(Math.random() * 300) + 1;
		const currentWord: string = words[randomNumber];

		selectedWords.push(currentWord);
	}

	return selectedWords;
};

const formatWords = (wordsArray: string[]): Word[] => {
	let result: Word[] = [];
	for (let i = 0; i < wordsArray.length; i++) {
		const currentWord: string = wordsArray[i];
		const currentWordLetters: Letter[] = currentWord
			.split("")
			.map((l: string) => {
				return new Letter(l);
			});

		const newWord = new Word(currentWordLetters);
		result.push(newWord);
	}

	return result;
};

const getRandomWords = (): Word[] => {
	const selectedWords: string[] = generateRandomWordsArray();
	const formattedWords: Word[] = formatWords(selectedWords);

	return formattedWords;
};

export { generateRandomWordsArray, getRandomWords, formatWords };
