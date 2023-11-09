import moment from "moment";
import { Tooltip } from "react-tooltip";
import { useSelector } from "react-redux";

import { RootState } from "../../store/Store";

import Word from "../../models/Word";
import Letter from "../../models/Letter";
import WriterMode from "../../models/enums/WriterMode";
import LetterStatus from "../../models/enums/LetterStatus";

import ResultsChart from "./resultsChart/ResultsChart";
import KeyStrokePerSecond from "../../models/KeyStrokesPerSecond";
import StatisticsItem from "../../models/StatisticsItem";
import ResetButton from "../writer/resetButton/ResetButton";

import { generateStatisticsItems } from "../../utils/Utilities";

function Results() {
  const writerMode: WriterMode = useSelector(
    (state: RootState) => state.settings.writerMode,
  );
  const wordsCount: number = useSelector(
    (state: RootState) => state.settings.wordsCount,
  );

  const writerStartTime: moment.Moment | null = useSelector(
    (state: RootState) => state.writer.startTime,
  );
  const writerEndTime: moment.Moment | null = useSelector(
    (state: RootState) => state.writer.endTime,
  );
  const timePassedInSeconds: number = Math.floor(
    moment.duration(writerEndTime?.diff(writerStartTime)).asSeconds(),
  );

  const correctKeyStrokes: number = useSelector(
    (state: RootState) => state.writer.correctKeyStrokes,
  );
  const wrongKeyStrokes: number = useSelector(
    (state: RootState) => state.writer.wrongKeyStrokes,
  );
  const allKeyStrokes: number = correctKeyStrokes + wrongKeyStrokes;

  const secondsCount: number = useSelector(
    (state: RootState) => state.settings.secondsCount,
  );

  const keyStrokesPerSecond: KeyStrokePerSecond[] = useSelector(
    (state: RootState) => state.writer.keyStrokesPerSecond,
  );

  const statisticsData: StatisticsItem[] =
    generateStatisticsItems(keyStrokesPerSecond);

  const wordsPerMinute: number = Math.floor(
    statisticsData.reduce(function (sum: number, item: StatisticsItem) {
      return sum + item.wpm;
    }, 0) / statisticsData.length,
  );

  const accuracy: number = Math.floor(
    (correctKeyStrokes / allKeyStrokes) * 100,
  );

  const words: Word[] = useSelector((state: RootState) => state.writer.words);
  const correctWords: Word[] = words.filter(
    (w: Word) =>
      !w.letters.some((l: Letter) => l.status === LetterStatus.Wrong),
  );
  const wrongWords: Word[] = words.filter((w: Word) =>
    w.letters.some((l: Letter) => l.status === LetterStatus.Wrong),
  );

  const getTestType = (): string => {
    let result: string = "";
    if (writerMode === WriterMode.Time) {
      result = `time/${secondsCount}s`;
    } else if (writerMode === WriterMode.WordCount) {
      result = `words/${wordsCount}`;
    } else if (writerMode === WriterMode.Quote) {
      result = `quote`;
    }

    return result;
  };

  const getTime = (): string => {
    let result: string = "";
    if (writerMode === WriterMode.Time) {
      result = `${secondsCount}s`;
    } else if (
      writerMode === WriterMode.WordCount ||
      writerMode === WriterMode.Quote
    ) {
      result = `${timePassedInSeconds}s`;
    }

    return result;
  };

  return (
    <>
      <div className="flex select-none flex-col justify-start">
        <div className="flex flex-col gap-5 lg:flex-row">
          <div className="flex flex-row justify-center gap-5 lg:flex-col">
            <div>
              <p className="text-3xl text-lightGray">wpm</p>
              <p className="text-7xl text-lightBlue">{wordsPerMinute}</p>
            </div>
            <div>
              <p className="text-3xl text-lightGray">acc</p>
              <p className="text-7xl text-lightBlue">{accuracy}%</p>
            </div>
          </div>
          <div className="h-56 flex-1 rounded border border-solid border-lightBlue p-3">
            <ResultsChart />
          </div>
        </div>
        <div className="mt-5 flex flex-row justify-evenly">
          <div
            className="flex flex-col"
            data-tooltip-id="results-tooltip"
            data-tooltip-content={`selected test type: ${getTestType()}`}
          >
            <p className="text-l text-lightGray">test type</p>
            <p className="text-2xl text-lightBlue">{getTestType()}</p>
          </div>
          <div className="flex flex-col">
            <p className="text-l text-lightGray">words</p>
            <p
              className="text-2xl text-lightBlue"
              data-tooltip-id="results-tooltip"
              data-tooltip-content={`total: ${words.length} (correct: ${correctWords.length} / wrong: ${wrongWords.length})`}
            >
              {words.length} ({correctWords.length}/{wrongWords.length})
            </p>
          </div>
          <div className="flex flex-col">
            <p className="text-l text-lightGray">characters</p>
            <p
              className="text-2xl text-lightBlue"
              data-tooltip-id="results-tooltip"
              data-tooltip-content={`total: ${allKeyStrokes} (correct: ${correctKeyStrokes} / wrong: ${wrongKeyStrokes})`}
            >
              {allKeyStrokes} ({correctKeyStrokes}/{wrongKeyStrokes})
            </p>
          </div>
          <div
            className="flex flex-col"
            data-tooltip-id="results-tooltip"
            data-tooltip-content={`time spent on test: ${getTime()}`}
          >
            <p className="text-l text-lightGray">time</p>
            <p className="text-2xl text-lightBlue">{getTime()}</p>
          </div>
        </div>
      </div>
      <ResetButton />
      <Tooltip
        id="results-tooltip"
        place="bottom"
        style={{
          background: "#151920",
          color: "#23a9d5",
        }}
      />
    </>
  );
}

export default Results;
