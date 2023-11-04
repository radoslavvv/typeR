/* eslint-disable react-refresh/only-export-components */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IWordCounterState {
  writtenWordsCount: number;
  allWordsCount: number;
  isFinished: boolean;
}

const initialState: IWordCounterState = {
  writtenWordsCount: 0,
  allWordsCount: 0,
  isFinished: true,
};

export const WordCounterSlice = createSlice({
  name: "wordCounter",
  initialState,
  reducers: {
    setWrittenWordsCount: (state, action: PayloadAction<number>) => {
      state.writtenWordsCount = action.payload;
    },
    setAllWordsCount: (state, action: PayloadAction<number>) => {
      state.allWordsCount = action.payload;
    },
    setIsFinished: (state, action: PayloadAction<boolean>) => {
      state.isFinished = action.payload;
    },
  },
});

export const { setWrittenWordsCount, setAllWordsCount, setIsFinished } =
  WordCounterSlice.actions;

export default WordCounterSlice;
