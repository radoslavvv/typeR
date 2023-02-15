import React, { useEffect, useState } from "react";
import { useTimer } from "../../hooks/useTimer";

import styles from "./Timer.module.scss";

interface ITimerProps {
	isRunning: boolean;
	onFinished: () => void;
}

const Timer = (props: ITimerProps) => {
	const { formattedTimer } = useTimer(props.isRunning, props.onFinished);

	return (
		<div className={styles.timer}>
			{formattedTimer}
		</div>
	);
};

export default Timer;
