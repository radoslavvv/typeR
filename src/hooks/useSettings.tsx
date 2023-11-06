// /* eslint-disable react-hooks/exhaustive-deps */
// import React from "react";
// import {
//   setCorrectKeyStrokes,
//   setCursorPosition,
//   setIsFinished,
//   setIsRunning,
//   setWords,
//   setWrongKeyStrokes,
// } from "../store/features/WordsSlice";
// import LetterStatus from "../models/enums/LetterStatus";
// import Word from "../models/Word";
// import CursorPosition from "../models/CursorPosition";
// import { getRandomWords } from "../utils/Utilities";
// import { useSelector } from "react-redux";
// import { RootState, useAppDispatch } from "../store/Store";
// import { MOST_USED_WORDS } from "../utils/words";
// import Letter from "../models/Letter";
// import WriterMode from "../models/enums/WriterMode";

// const useWriter = () => {
//   const dispatch = useAppDispatch();

//   const writerMode: WriterMode = useSelector(
//     (state: RootState) => state.settings.writerMode,
//   );
//   const numbersAreEnabled: boolean = useSelector(
//     (state: RootState) => state.settings.numbersAreEnabled,
//   );
//   const punctuationIsEnabled: boolean = useSelector(
//     (state: RootState) => state.settings.punctuationIsEnabled,
//   );
//   const secondsCount: number = useSelector(
//     (state: RootState) => state.settings.secondsCount,
//   );
//   const wordsCount: number = useSelector(
//     (state: RootState) => state.settings.wordsCount,
//   );

//   return {
//     writerMode,
//     numbersAreEnabled,
//     punctuationIsEnabled,
//     secondsCount,
//     wordsCount,
//   };
// };

// export default useWriter;
