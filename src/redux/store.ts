import { configureStore } from "@reduxjs/toolkit";

import timerReducer from "./features/timer/timerSlice";
import writerReducer from "./features/writer/writerSlice";
import configReducer from "./features/config/configSlice";

export const store = configureStore({
	reducer: {
		timer: timerReducer,
		writer: writerReducer,
		config: configReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});
