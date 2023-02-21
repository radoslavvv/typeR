import React, { KeyboardEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useWriter from "../../hooks/useWriter";
import { TimerState } from "../../redux/features/timer/timerSlice";
import Keyboard from "../keyboard/Keyboard";
import ResultsSection from "../resultsSection/ResultsSection";
import Timer from "../timer/Timer";
import Writer from "../writer/Writer";

import styles from "./Main.module.scss";

const Main = () => {
	const { timerIsDone } = useSelector((state: any) => state.timer);

	return (
		<>
			{!timerIsDone && (
				<>
					<Timer />
					<Writer />
					<Keyboard />
				</>
			)}

			{timerIsDone && <ResultsSection />}
		</>
	);
};

export default Main;
