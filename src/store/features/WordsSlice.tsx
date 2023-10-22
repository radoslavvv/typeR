import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Word from "../../models/Word";
import CursorPosition from "../../models/CursorPosition";

interface IWordsState {
  rawWords: string[];

  words: Word[];
  cursorPosition: CursorPosition;
  writtenWord: Word | null;
}

const initialState: IWordsState = {
  rawWords: [],

  words: [],
  cursorPosition: new CursorPosition(0, 0),
  writtenWord: null,
};

export const WordsSlice = createSlice({
  name: "words",
  initialState,
  reducers: {
    setWords: (state, action: PayloadAction<Word[]>) => {
      state.words = [...action.payload];
    },
    setCursorPosition: (state, action: PayloadAction<number[]>) => {
      state.cursorPosition = new CursorPosition(
        action.payload[0],
        action.payload[1],
      );
    },
  },
});

export const { setWords, setCursorPosition } = WordsSlice.actions;

export default WordsSlice;
