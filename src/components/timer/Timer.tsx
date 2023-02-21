import { useTimer } from "../../hooks/useTimer";

import styles from "./Timer.module.scss";

const Timer = () => {
	const { formattedTimer } = useTimer();

	return <div className={styles.timer}>{formattedTimer}</div>;
};

export default Timer;
