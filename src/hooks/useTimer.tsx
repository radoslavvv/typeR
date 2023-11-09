import React from "react";
import moment from "moment";
import { useSelector } from "react-redux";

import { RootState, useAppDispatch } from "../store/Store";
import {
  setEndTime,
  setIsFinished,
  setIsRunning,
  setRemainingSeconds,
} from "../store/features/WriterSlice";

const useTimer = () => {
  const dispatch = useAppDispatch();

  const settingsSeconds: number = useSelector(
    (state: RootState) => state.settings.secondsCount,
  );

  const writerIsRunning: boolean = useSelector(
    (state: RootState) => state.writer.isRunning,
  );
  const seconds: number = useSelector(
    (state: RootState) => state.writer.remainingSeconds,
  );

  const updateTimer = () => {
    dispatch(setRemainingSeconds(seconds - 1));
  };

  React.useEffect(() => {
    if (writerIsRunning) {
      setTimeout(() => {
        updateTimer();
      }, 1000);
    }
  }, [writerIsRunning]);

  React.useEffect(() => {
    if (writerIsRunning && seconds >= 0) {
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
