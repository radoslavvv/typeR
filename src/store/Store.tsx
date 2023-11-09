import { useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import writerSlice from "./features/WriterSlice";
import settingsSlice from "./features/SettingsSlice";

const store = configureStore({
  reducer: {
    writer: writerSlice.reducer,
    settings: settingsSlice.reducer,
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
