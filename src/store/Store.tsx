import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import wordsSlice from "./features/WordsSlice";

const store = configureStore({
  reducer: {
    words: wordsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
