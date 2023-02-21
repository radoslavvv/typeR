import { useEffect, useMemo, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { stopTimer, updateTime } from "../redux/features/timer/timerSlice";

export const useTimer = () => {
	const dispatch = useDispatch();
	const { isStarted, time } = useSelector((state: any) => state.timer);

	useEffect(() => {
		if (isStarted) {
			if (time === 0) {
				dispatch(stopTimer());
				return;
			}

			setTimeout(() => {
				dispatch(updateTime());
			}, 1000);
		}
	}, [isStarted, time]);

	const formattedTimer = useMemo(() => {
		const formattedSeconds = time.toLocaleString("en-US", {
			minimumIntegerDigits: 2,
			useGrouping: false,
		});

		return `00:${formattedSeconds}`;
	}, [time]);

	return { formattedTimer };
};
