import React, { KeyboardEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useWriter from "../../hooks/useWriter";
import Keyboard from "../keyboard/Keyboard";
import ResultsSection from "../resultsSection/ResultsSection";
import Timer from "../timer/Timer";
import Writer from "../writer/Writer";

import styles from "./Main.module.scss";

const Main = () => {
	const { isDone } = useSelector((state: any) => state.timer);

	return (
		<>
			{!isDone && (
				<>
					<Timer />
					<Writer />
					<Keyboard />
				</>
			)}

			{isDone && <ResultsSection />}
		</>
	);
};

export default Main;
