import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import LetterColor from "../../../enums/LetterColor";
import Word from "../../../models/Word";

export interface WriterSlice {
	allWords: Word[];
	currentVisibleWords: Word[];

	wordIndex: number;
	letterIndex: number;

	pageNumber: number;
	wordsPerPage: number;

	shiftIsPressed: boolean;

	correctKeyStrokes: number;
	wrongKeyStrokes: number;

	writtenWordsCount: number;
}

const initialState: WriterSlice = {
	allWords: [],
	currentVisibleWords: [],

	wordIndex: 0,
	letterIndex: 0,

	wordsPerPage: 42,
	pageNumber: 0,

	shiftIsPressed: false,

	correctKeyStrokes: 0,
	wrongKeyStrokes: 0,

	writtenWordsCount: 0,
};

export const writerSlice = createSlice({
	name: "writer",
	initialState,
	reducers: {
		setAllWords: (state, action: PayloadAction<Word[]>) => {
			state.allWords = [...action.payload];

			state.currentVisibleWords = [
				...action.payload.slice(0, state.wordsPerPage),
			];
		},

		deleteCurrentLetter: (state) => {
			if (state.letterIndex === 0 && state.wordIndex != 0) {
				const newLetterIndex =
					state.currentVisibleWords[state.wordIndex - 1]?.letters
						?.length;

				state.letterIndex = newLetterIndex;
				state.wordIndex -= 1;
			} else {
				state.letterIndex = Math.max(state.letterIndex - 1, 0);
			}
		},
		setCurrentLetterColor: (state, action: PayloadAction<LetterColor>) => {
			state.currentVisibleWords[state.wordIndex].letters[
				state.letterIndex
			] = {
				...state.currentVisibleWords[state.wordIndex].letters[
					state.letterIndex
				],
				color: action.payload,
			};

			if (action.payload === LetterColor.Green) {
				state.correctKeyStrokes++;
			} else {
				state.wrongKeyStrokes++;
			}
		},
		moveToNextLetter: (state) => {
			state.letterIndex += 1;
		},

		moveToPreviousWord: (state) => {
			state.wordIndex -= 1;

			state.writtenWordsCount -= 1;
		},
		moveToNextWord: (state) => {
			state.currentVisibleWords[state.wordIndex]?.letters?.map(
				(l: any) => {
					if (l.color === LetterColor.Gray) {
						l.color = LetterColor.Red;
					}

					return l;
				}
			);

			// if (
			// 	state.currentVisibleWords[state.wordIndex]?.letters.find(
			// 		(l) => l.color === LetterColor.Red
			// 	)
			// ) {
			// 	state.wrongWords++;
			// } else {
			// 	state.correctWords++;
			// }

			state.writtenWordsCount += 1;

			state.wordIndex += 1;

			state.letterIndex = 0;
		},

		setShiftIsPressed: (state, action: PayloadAction<boolean>) => {
			state.shiftIsPressed = action.payload;
		},

		moveToNextPage: (state) => {
			const startIndex: number =
				state.wordsPerPage * state.pageNumber + state.wordIndex + 1;
			const endIndex: number = startIndex + state.wordsPerPage;

			state.currentVisibleWords = [
				...state.allWords.slice(startIndex, endIndex),
			];

			state.wordIndex = 0;
			state.letterIndex = 0;

			state.pageNumber += 1;
		},
		resetWriter: (state) => {
			state.allWords = [];
			state.currentVisibleWords = [];

			state.wordIndex = 0;
			state.letterIndex = 0;

			state.wordsPerPage = 42;
			state.pageNumber = 0;

			state.shiftIsPressed = false;

			state.correctKeyStrokes = 0;
			state.wrongKeyStrokes = 0;
		},
	},
});

export const {
	setAllWords,
	moveToNextLetter,
	setCurrentLetterColor,
	deleteCurrentLetter,
	moveToPreviousWord,
	moveToNextWord,
	setShiftIsPressed,
	moveToNextPage,
	resetWriter,
} = writerSlice.actions;

export default writerSlice.reducer;
