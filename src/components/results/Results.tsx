import { useSelector } from "react-redux";
import WriterMode from "../../models/enums/WriterMode";
import { RootState } from "../../store/Store";
import moment from "moment";

function Results() {
  const writerMode: WriterMode = useSelector(
    (state: RootState) => state.settings.writerMode,
  );
  const wordsCount: number = useSelector(
    (state: RootState) => state.settings.wordsCount,
  );

  // const punctuationIsEnabled: boolean = useSelector(
  //   (state: RootState) => state.settings.punctuationIsEnabled,
  // );
  // const numbersAreEnabled: boolean = useSelector(
  //   (state: RootState) => state.settings.numbersAreEnabled,
  // );

  const writerStartTime: moment.Moment | null = useSelector(
    (state: RootState) => state.words.startTime,
  );
  const writerEndTime: moment.Moment | null = useSelector(
    (state: RootState) => state.words.endTime,
  );
  const timePassedInSeconds: number = moment
    .duration(writerEndTime?.diff(writerStartTime))
    .asSeconds();

  const correctKeyStrokes: number = useSelector(
    (state: RootState) => state.words.correctKeyStrokes,
  );
  const wrongKeyStrokes: number = useSelector(
    (state: RootState) => state.words.wrongKeyStrokes,
  );
  const allKeyStrokes: number = correctKeyStrokes + wrongKeyStrokes;

  const secondsCount: number = useSelector(
    (state: RootState) => state.settings.secondsCount,
  );

  const wordsPerMinute: number = Math.floor(
    allKeyStrokes / 5 / (timePassedInSeconds / 60),
  );

  const accuracy: number = Math.floor(
    (correctKeyStrokes / allKeyStrokes) * 100,
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

  return (
    <>
      <div className="flex select-none flex-col">
        <div className="flex flex-col">
          <div>
            <p className="text-3xl text-lightGray">wpm</p>
            <p className="text-7xl text-lightBlue">{wordsPerMinute}</p>
          </div>
          <div>
            <p className="text-3xl text-lightGray">acc</p>
            <p className="text-7xl text-lightBlue">{accuracy}%</p>
          </div>
        </div>
        <div className="mt-5 flex flex-row justify-evenly">
          <div className="flex flex-col">
            <p className="text-l text-lightGray">test type</p>
            <p className="text-2xl text-lightBlue">{getTestType()}</p>
          </div>
          <div className="flex flex-col">
            <p className="text-l text-lightGray">words</p>
            <p className="text-2xl text-lightBlue">
              {allKeyStrokes} ({correctKeyStrokes}/{wrongKeyStrokes})
            </p>
          </div>
          <div className="flex flex-col">
            <p className="text-l text-lightGray">characters</p>
            <p className="text-2xl text-lightBlue">
              {allKeyStrokes} ({correctKeyStrokes}/{wrongKeyStrokes})
            </p>
          </div>
          <div className="flex flex-col">
            <p className="text-l text-lightGray">time</p>
            <p className="text-2xl text-lightBlue">{timePassedInSeconds}s</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Results;
