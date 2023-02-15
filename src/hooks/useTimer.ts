import { useEffect, useMemo, useState } from "react";

export const useTimer = (isRunning: boolean, onFinished: () => void) => {
    const [timerTime, setTimerTime] = useState<number>(30);
    
	useEffect(() => {
		if (isRunning) {
			const timerInterval = setInterval(() => {
				setTimerTime((prev: number) => {
					const newTimerTime = prev - 1;

					if (newTimerTime === 0) {
						onFinished();
						clearInterval(timerInterval);
					}

					return newTimerTime;
				});
			}, 1000);
		}
	}, [isRunning]);

    const formattedTimer = useMemo(() => {
        const formattedSeconds = timerTime.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});

        return `00:${formattedSeconds}`
    }, [timerTime]);
    
    return {formattedTimer};
}