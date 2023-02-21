import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import LetterColor from "../../../enums/LetterColor";
import Word from "../../../models/Word";
import { WORDS_PER_PAGE } from "../../../utils/constants";

export interface WriterSlice {
	allWords: Word[];
	words: Word[];

	wordIndex: number;
	letterIndex: number;
	wordsPage: number;

	shiftIsPressed: boolean;
}

const initialState: WriterSlice = {
	allWords: [],
	words: [],

	wordIndex: 0,
	letterIndex: 0,
	wordsPage: 0,

	shiftIsPressed: false,
};

export const writerSlice = createSlice({
	name: "wrtier",
	initialState,
	reducers: {
		setAllWords: (state, action: PayloadAction<Word[]>) => {
			state.allWords = [...action.payload];
		},
		setWords: (state, action: PayloadAction<Word[]>) => {
			state.words = action.payload;
		},

		deleteCurrentLetter: (state) => {
			if (state.letterIndex === 0 && state.wordIndex != 0) {
				const newLetterIndex =
					state.words[state.wordIndex - 1]?.letters?.length;

				state.letterIndex = newLetterIndex;
				state.wordIndex -= 1;
			} else {
				state.letterIndex = Math.max(state.letterIndex - 1, 0);
			}
		},
		updateCurrentLetterColor: (
			state,
			action: PayloadAction<LetterColor>
		) => {
			state.words[state.wordIndex].letters[state.letterIndex] = {
				...state.words[state.wordIndex].letters[state.letterIndex],
				color: action.payload,
			};
		},
		moveToNextLetter: (state) => {
			state.letterIndex += 1;
		},

		moveToPreviousWord: (state) => {
			state.wordIndex -= 1;
		},
		moveToNextWord: (state) => {
			state.words[state.wordIndex]?.letters?.map((l: any) => {
				if (l.color === LetterColor.Gray) {
					l.color = LetterColor.Red;
				}

				return l;
			});

			state.wordIndex += 1;

			state.letterIndex = 0;
		},

		setShiftIsPressed: (state, action: PayloadAction<boolean>) => {
			state.shiftIsPressed = action.payload;
		},

		moveToNextPage: (state) => {
			const startIndex: number =
				WORDS_PER_PAGE * state.wordsPage + state.wordIndex + 1;
			const endIndex: number = startIndex + WORDS_PER_PAGE;

			state.words = [...state.allWords.slice(startIndex, endIndex)];

			state.wordIndex = 0;
			state.letterIndex = 0;

			state.wordsPage += 1;
		},
	},
});

export const {
	setAllWords,
	setWords,
	deleteCurrentLetter,
	moveToPreviousWord,
	moveToNextWord,
	moveToNextLetter,
	setShiftIsPressed,
	updateCurrentLetterColor,
	moveToNextPage,
} = writerSlice.actions;

export default writerSlice.reducer;
