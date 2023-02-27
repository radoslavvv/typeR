import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ConfigState {
	timerConfigTime: number;
}

const initialState: ConfigState = {
	timerConfigTime: 125,
};

export const configSlice = createSlice({
	name: "config",
	initialState,
	reducers: {
		setTimerTime: (state, action: PayloadAction<number>) => {
			state.timerConfigTime = action.payload;
		},
	},
});

export const { setTimerTime } = configSlice.actions;

export default configSlice.reducer;
