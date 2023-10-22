import { createSlice } from "@reduxjs/toolkit";
import Word from "../../models/Word";
import CursorPosition from "../../models/CursorPosition";

interface IWordsState {
  rawWords: string[];

  words: Word[];
  cursorPosition: CursorPosition | null;
  writtenWord: Word | null;
}

const initialState: IWordsState = {
  rawWords: [],

  words: [],
  cursorPosition: null,
  writtenWord: null,
};

export const WordsSlice = createSlice({
  name: "words",
  initialState,
  reducers: {},
});

export const {} = WordsSlice.actions;

export default WordsSlice;
