import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../store/Store";
import React from "react";
import {
  setEndTime,
  setIsFinished,
  setIsRunning,
  setRemainingSeconds,
} from "../store/features/WordsSlice";
import moment from "moment";

const useTimer = () => {
  const dispatch = useAppDispatch();

  const settingsSeconds: number = useSelector(
    (state: RootState) => state.settings.secondsCount,
  );

  const writerIsRunning: boolean = useSelector(
    (state: RootState) => state.words.isRunning,
  );
  const seconds: number = useSelector(
    (state: RootState) => state.words.remainingSeconds,
  );

  const updateTimer = () => {
    dispatch(setRemainingSeconds(seconds - 1));
  };

  React.useEffect(() => {
    if (writerIsRunning) {
      updateTimer();
    }
  }, [writerIsRunning]);

  React.useEffect(() => {
    if (writerIsRunning && seconds > 0) {
      setTimeout(() => {
        updateTimer();
      }, 1000);
    }

    if (seconds <= 0) {
      dispatch(setIsRunning(false));
      dispatch(setIsFinished(true));
      dispatch(setEndTime(moment()));
    }
  }, [seconds]);

  React.useEffect(() => {
    dispatch(setRemainingSeconds(settingsSeconds));
  }, [settingsSeconds]);

  return { seconds };
};

export default useTimer;
