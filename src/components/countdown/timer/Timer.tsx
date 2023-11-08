import useTimer from "../../../hooks/useTimer";

const Timer = () => {
  const { seconds } = useTimer();

  const formatRemainingSeconds = (secondsCount: number): string => {
    if (secondsCount < 60) {
      return secondsCount.toString();
    }

    const minutes: number = Math.floor(secondsCount / 60);
    const remainingSeconds: number = secondsCount % 60;

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
