/* eslint-disable react-refresh/only-export-components */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Word from "../../models/Word";
import CursorPosition from "../../models/CursorPosition";

interface IWordsState {
  isStarted: boolean;
  isRunning: boolean;
  isFinished: boolean;

  words: Word[];
  cursorPosition: CursorPosition;

  correctKeyStrokes: number;
  wrongKeyStrokes: number;
}

const initialState: IWordsState = {
  isStarted: false,
  isRunning: false,
  isFinished: false,

  words: [],
  cursorPosition: new CursorPosition(0, 0),

  correctKeyStrokes: 0,
  wrongKeyStrokes: 0,
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
    setCorrectKeyStrokes: (state, action: PayloadAction<number>) => {
      state.correctKeyStrokes = action.payload;
    },
    setWrongKeyStrokes: (state, action: PayloadAction<number>) => {
      state.wrongKeyStrokes = action.payload;
    },
    setIsRunning: (state, action: PayloadAction<boolean>) => {
      state.isRunning = action.payload;
    },
    setIsFinished: (state, action: PayloadAction<boolean>) => {
      state.isFinished = action.payload;
    },
    reset: (state) => {
      state.isStarted = false;
      state.isRunning = false;
      state.isFinished = false;

      state.cursorPosition = new CursorPosition(0, 0);

      state.words = [];

      state.correctKeyStrokes = 0;
      state.wrongKeyStrokes = 0;
    },
  },
});

export const {
  setWords,
  setCursorPosition,
  setCorrectKeyStrokes,
  setWrongKeyStrokes,
  setIsRunning,
  setIsFinished,
  reset,
} = WordsSlice.actions;

export default WordsSlice;
