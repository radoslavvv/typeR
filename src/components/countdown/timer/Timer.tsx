import useTimer from "../../../hooks/useTimer";

import { SECONDS_IN_MINUTE } from "../../../utils/constants";

const Timer = () => {
  const { seconds } = useTimer();

  const formatRemainingSeconds = (secondsCount: number): string => {
    if (secondsCount < SECONDS_IN_MINUTE) {
      return secondsCount.toString();
    }

    const minutes: number = Math.floor(secondsCount / SECONDS_IN_MINUTE);
    const remainingSeconds: number = secondsCount % SECONDS_IN_MINUTE;

    const formattedTime = `${minutes}:${
      remainingSeconds < 10 ? "0" : ""
    }${remainingSeconds}`;

    return formattedTime;
  };

  return (
    <div className="mb-1 select-none text-2xl text-lightBlue">
      {formatRemainingSeconds(seconds)}
    </div>
  );
};

export default Timer;
