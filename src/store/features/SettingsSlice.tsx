/* eslint-disable react-refresh/only-export-components */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import WriterMode from "../../models/enums/WriterMode";

interface ISettingsState {
  writerMode: WriterMode;

  punctuationIsEnabled: boolean;
  numbersAreEnabled: boolean;

  wordsCount: number;
  secondsCount: number;
}

const initialState: ISettingsState = {
  writerMode: WriterMode.WordCount,

  punctuationIsEnabled: false,
  numbersAreEnabled: false,

  wordsCount: 50,
  secondsCount: 60,
};

export const SettingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setWriterMode: (state, action: PayloadAction<WriterMode>) => {
      state.writerMode = action.payload;
    },
    setPunctuationIsEnabled: (state, action: PayloadAction<boolean>) => {
      state.punctuationIsEnabled = action.payload;
    },
    setNumbersAreEnabled: (state, action: PayloadAction<boolean>) => {
      state.numbersAreEnabled = action.payload;
    },
    setWordsCount: (state, action: PayloadAction<number>) => {
      state.wordsCount = action.payload;
    },
    setSecondsCount: (state, action: PayloadAction<number>) => {
      state.secondsCount = action.payload;
    },
  },
});

export const {
  setWriterMode,
  setPunctuationIsEnabled,
  setNumbersAreEnabled,
  setWordsCount,
  setSecondsCount,
} = SettingsSlice.actions;

export default SettingsSlice;
