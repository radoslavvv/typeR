import { configureStore } from "@reduxjs/toolkit";

import timerReducer from "./features/timer/timerSlice";
import writerReducer from "./features/writer/writerSlice";

export const store = configureStore({
	reducer: {
		timer: timerReducer,
		writer: writerReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});
