/* eslint-disable react-refresh/only-export-components */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Word from "../../models/Word";
import CursorPosition from "../../models/CursorPosition";

interface ITimerState {
  words: Word[];
  cursorPosition: CursorPosition;

  correctKeyStrokes: number;
  wrongKeyStrokes: number;
}

const initialState: ITimerState = {
  words: [],
  cursorPosition: new CursorPosition(0, 0, 0, 0),

  correctKeyStrokes: 0,
  wrongKeyStrokes: 0,
};

export const TimerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    setWords: (state, action: PayloadAction<Word[]>) => {
      state.words = [...action.payload];
    },
  },
});

export const { setWords } = TimerSlice.actions;

export default TimerSlice;
