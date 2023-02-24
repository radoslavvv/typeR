import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TimerState {
	timerIsStarted: boolean;
	timerIsDone: boolean;

	timerTime: number;
}

const initialState: TimerState = {
	timerIsStarted: false,
	timerIsDone: false,

	timerTime: 0,
};

export const timerSlice = createSlice({
	name: "timer",
	initialState,
	reducers: {
		setTimerTime: (state, action: PayloadAction<number>) => {
			state.timerTime = action.payload;
		},

		startTimer: (state) => {
			state.timerIsStarted = true;
			state.timerIsDone = false;
		},
		stopTimer: (state) => {
			state.timerIsStarted = false;
			state.timerIsDone = true;
		},
		updateTime: (state) => {
			state.timerTime -= 1;
		},
		resetTimer: (state, action: PayloadAction<number>) => {
			state.timerTime = action.payload;
			state.timerIsStarted = false;
			state.timerIsDone = false;
		},
	},
});

export const { startTimer, stopTimer, updateTime, setTimerTime, resetTimer } =
	timerSlice.actions;

export default timerSlice.reducer;
