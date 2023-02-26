import { useEffect, useMemo } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
	setTimerTime,
	stopTimer,
	updateTime,
} from "../redux/features/timer/timerSlice";

const useTimer = () => {
	const dispatch = useDispatch();
	const { timerConfigTime } = useSelector((state: any) => state.config);
	const { timerIsStarted, timerTime } = useSelector(
		(state: any) => state.timer
	);

	useEffect(() => {
		dispatch(setTimerTime(timerConfigTime));
	}, []);

	useEffect(() => {
		if (timerIsStarted) {
			if (timerTime === 0) {
				dispatch(stopTimer());
				return;
			}

			setTimeout(() => {
				dispatch(updateTime());
			}, 1000);
		}
	}, [timerIsStarted, timerTime]);

	const formattedTimer = useMemo(() => {
		const minutes: number = Math.floor(timerTime / 60);
		const seconds: number = timerTime % 60;

		const formattedSeconds = seconds.toLocaleString("en-US", {
			minimumIntegerDigits: 2,
			useGrouping: false,
		});

		const formattedMinutes = minutes.toLocaleString("en-US", {
			minimumIntegerDigits: 2,
			useGrouping: false,
		});

		return `${formattedMinutes}:${formattedSeconds}`;
	}, [timerTime]);

	return { formattedTimer };
};

export default useTimer;
