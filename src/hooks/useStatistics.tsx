import React from "react";
import { useSelector } from "react-redux";

import { RootState, useAppDispatch } from "../store/Store";
import {
  setKeyStrokesPerSecond,
  setStatisticsSeconds,
} from "../store/features/WriterSlice";

import WriterMode from "../models/enums/WriterMode";
import KeyStrokePerSecond from "../models/KeyStrokesPerSecond";

const useStatistics = () => {
  const dispatch = useAppDispatch();

  const writerMode: WriterMode = useSelector(
    (state: RootState) => state.settings.writerMode,
  );

  const statisticsSeconds: number = useSelector(
    (state: RootState) => state.writer.statisticsSeconds,
  );

  const correctKeyStrokes: number = useSelector(
    (state: RootState) => state.writer.correctKeyStrokes,
  );
  const wrongKeyStrokes: number = useSelector(
    (state: RootState) => state.writer.wrongKeyStrokes,
  );
  const keyStrokesPerSecond: KeyStrokePerSecond[] = useSelector(
    (state: RootState) => state.writer.keyStrokesPerSecond,
  );

  const isRunning: boolean = useSelector(
    (state: RootState) => state.writer.isRunning,
  );
  const isFinished: boolean = useSelector(
    (state: RootState) => state.writer.isFinished,
  );

  const updateTimer = () => {
    dispatch(setStatisticsSeconds(statisticsSeconds + 1));
  };

  React.useEffect(() => {
    if (isRunning) {
      setTimeout(() => {
        updateTimer();
      }, 1000);
    }
  }, [isRunning]);

  React.useEffect(() => {
    if (statisticsSeconds > 0 && isRunning && !isFinished) {
      setTimeout(() => {
        updateTimer();
      }, 1000);
    } else {
      if (writerMode === WriterMode.Time) {
        const currentKeyStrokesPerSecond: KeyStrokePerSecond =
          new KeyStrokePerSecond(
            correctKeyStrokes + wrongKeyStrokes,
            statisticsSeconds,
          );
        if (
          !keyStrokesPerSecond.some(
            (kps: KeyStrokePerSecond) => kps.second === statisticsSeconds,
          )
        ) {
          dispatch(setKeyStrokesPerSecond(currentKeyStrokesPerSecond));
        }
      }
    }
  }, [statisticsSeconds]);

  return {};
};

export default useStatistics;
