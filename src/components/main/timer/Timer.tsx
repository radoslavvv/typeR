import { useSelector } from "react-redux";
import useTimer from "../../../hooks/useTimer";

import styles from "./Timer.module.scss";

const Timer = () => {
	const { formattedTimer } = useTimer();

	return (
		<div className={styles.timerContainer}>
			<div className={styles.timer}>{formattedTimer}</div>
		</div>
	);
};

export default Timer;
