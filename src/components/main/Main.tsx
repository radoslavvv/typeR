import { useSelector } from "react-redux";
import Keyboard from "./keyboard/Keyboard";
import ResultsSection from "./results/Results";
import Timer from "./timer/Timer";
import Writer from "./writer/Writer";

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
