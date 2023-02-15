import { useEffect, useMemo, useState } from "react";
import Word from "../models/Word"
import { WORDS_PER_PAGE } from "../utils/constants";

export const usePagedWords = (allWords: Word[], wordIndex: number) => {
	const [wordsPageNumber, setWordsPageNumber] = useState<number>(0);

	useEffect(() => {
		if (wordIndex > 0 && wordIndex % WORDS_PER_PAGE === 0) {
			setWordsPageNumber((prev: number) => {
				return prev + 1;
			});
		}
	}, [wordIndex]);
    
    const wordsPage = useMemo(() => {
		return allWords
			.slice(
				wordsPageNumber * WORDS_PER_PAGE,
				wordsPageNumber * WORDS_PER_PAGE + WORDS_PER_PAGE
			)
	}, [allWords, wordsPageNumber]);

    return wordsPage;
}