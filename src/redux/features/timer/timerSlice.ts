import { createSlice } from "@reduxjs/toolkit";

export interface TimerState {
	isStarted: boolean;
	isDone: boolean;

	time: number;
}

const initialState: TimerState = {
	isStarted: false,
	isDone: false,

	time: 10,
};

export const timerSlice = createSlice({
	name: "timer",
	initialState,
	reducers: {
		startTimer: (state) => {
			state.isStarted = true;
			state.isDone = false;
		},
		stopTimer: (state) => {
			state.isStarted = false;
			state.isDone = true;
		},
		updateTime: (state) => {
			state.time -= 1;
		},
	},
});

export const { startTimer, stopTimer, updateTime } = timerSlice.actions;

export default timerSlice.reducer;
