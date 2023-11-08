/* eslint-disable react-refresh/only-export-components */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Word from "../../models/Word";
import CursorPosition from "../../models/CursorPosition";
import * as moment from "moment";

interface IWordsState {
  isStarted: boolean;
  isRunning: boolean;
  isFinished: boolean;

  startTime: moment.Moment | null;
  endTime: moment.Moment | null;

  words: Word[];
  cursorPosition: CursorPosition;

  remainingSeconds: number;

  correctKeyStrokes: number;
  wrongKeyStrokes: number;
}

const initialState: IWordsState = {
  isStarted: false,
  isRunning: false,
  isFinished: false,

  startTime: null,
  endTime: null,

  words: [],
  cursorPosition: new CursorPosition(0, 0, 0, 0),

  remainingSeconds: 60,

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
        action.payload[2],
        action.payload[3],
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
    setStartTime: (state, action: PayloadAction<moment.Moment>) => {
      state.startTime = action.payload;
    },
    setEndTime: (state, action: PayloadAction<moment.Moment>) => {
      state.endTime = action.payload;
    },
    setRemainingSeconds: (state, action: PayloadAction<number>) => {
      state.remainingSeconds = action.payload;
    },
    reset: (state) => {
      state.isStarted = false;
      state.isRunning = false;
      state.isFinished = false;

      state.startTime = null;
      state.endTime = null;

      state.cursorPosition = new CursorPosition(0, 0, 0, 0);

      state.words = [];

      state.remainingSeconds = 60;

      state.correctKeyStrokes = 0;
      state.wrongKeyStrokes = 0;
    },
    start: (state) => {
      state.isRunning = true;
      state.isFinished = false;
      state.startTime = moment();
    },
    end: (state) => {
      state.isRunning = false;
      state.isFinished = true;
      state.endTime = moment();
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
  setStartTime,
  setEndTime,
  setRemainingSeconds,
  reset,
  start,
  end,
} = WordsSlice.actions;

export default WordsSlice;
