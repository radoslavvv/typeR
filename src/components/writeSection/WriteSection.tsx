import React, { KeyboardEvent, useEffect, useState } from "react";
import WordsHelper from "../../helpers/WordsHelper";
import useWriter from "../../hooks/useWriter";
import Keyboard from "../keyboard/Keyboard";
import ResultsSection from "../resultsSection/ResultsSection";
import Timer from "../timer/Timer";
import Writer from "../writer/Writer";

import styles from './WriteSection.module.scss';

const WriteSection = () => {
	const [timerIsDone, setTimerIsDone] = useState<boolean>(false);
	const [timerIsStarted, setTimerIsStarted] = useState<boolean>(false);

	const onTimerFinished = () => {
		setTimerIsDone(true);
	}
	
	return (
		<>
			{!timerIsDone && (
				<>
					<Timer
						isRunning={timerIsStarted}
						onFinished={onTimerFinished}
					/>

					<Writer
						timerIsStarted={timerIsStarted}
						setTimerIsStarted={setTimerIsStarted}
					/>

					<Keyboard />
				</>
			)}

			{timerIsDone && <ResultsSection />}
		</>
	);
};

export default WriteSection;
