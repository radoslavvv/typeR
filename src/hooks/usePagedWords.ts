import { useEffect, useMemo, useState } from "react";
import Word from "../models/Word";
import { WORDS_PER_PAGE } from "../utils/constants";

const usePagedWords = (
	allWords: Word[],
	wordIndex: number,
	setWordIndex: (index: number) => void,
	setLetterIndex: (index: number) => void
) => {
	const [currentWords, setCurrentWords] = useState<Word[]>([]);

	useEffect(() => {
		if (wordIndex >= WORDS_PER_PAGE) {
			const startIndex: number = wordIndex + 1;
			const endIndex: number = startIndex + WORDS_PER_PAGE;

			setCurrentWords([...allWords.slice(startIndex, endIndex)]);

			setWordIndex(0);
			setLetterIndex(0);
		}
	}, [wordIndex]);

	useEffect(() => {
		setCurrentWords([...allWords.slice(0, WORDS_PER_PAGE)]);
	}, [allWords]);

	return { currentWords };
};

export default usePagedWords;
