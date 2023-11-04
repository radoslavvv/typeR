import WriterMode from "../../models/enums/WriterMode";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store/Store";
import {
  setNumbersAreEnabled,
  setPunctuationIsEnabled,
  setSecondsCount,
  setWordsCount,
  setWriterMode,
} from "../../store/features/SettingsSlice";
import {
  BsCCircleFill,
  BsChatQuoteFill,
  BsFillClockFill,
  BsFillPencilFill,
  BsHash,
} from "react-icons/bs";

const Settings = () => {
  const dispatch = useAppDispatch();

  const writerMode: WriterMode = useSelector(
    (state: RootState) => state.settings.writerMode,
  );
  const punctuationIsEnabled: boolean = useSelector(
    (state: RootState) => state.settings.punctuationIsEnabled,
  );
  const numbersAreEnabled: boolean = useSelector(
    (state: RootState) => state.settings.numbersAreEnabled,
  );

  const wordsCount: number = useSelector(
    (state: RootState) => state.settings.wordsCount,
  );

  const secondsCount: number = useSelector(
    (state: RootState) => state.settings.secondsCount,
  );

  const handleWriterModeChange = (newWriterMode: WriterMode) => {
    dispatch(setWriterMode(newWriterMode));
  };

  const handleWordCountChange = (newWordCount: number) => {
    dispatch(setWordsCount(newWordCount));
  };

  const handleSecondsCountChange = (newSecondsCount: number) => {
    dispatch(setSecondsCount(newSecondsCount));
  };

  const wordCountOptions: number[] = [10, 25, 50, 100, 200];

  const secondsOptions: number[] = [15, 30, 60, 120, 180];

  return (
    <div className="mx-auto flex w-auto select-none gap-4 self-center rounded-lg bg-darkBlue px-7 py-2 text-lightGray transition-all duration-200 ">
      <div className="flex gap-4">
        <button
          onClick={() =>
            dispatch(setPunctuationIsEnabled(!punctuationIsEnabled))
          }
          className={`flex items-center justify-center gap-1 duration-200 hover:text-customWhite ${
            punctuationIsEnabled ? "text-lightBlue" : ""
          }`}
        >
          <BsFillPencilFill />
          punctuation
        </button>
        <button
          onClick={() => dispatch(setNumbersAreEnabled(!numbersAreEnabled))}
          className={`flex items-center justify-center duration-200 hover:text-customWhite ${
            numbersAreEnabled ? "text-lightBlue" : ""
          }`}
        >
          <BsHash />
          numbers
        </button>
      </div>

      <div className="w-0.5 bg-lightGray"></div>

      <div className="flex gap-4">
        <button
          className={`flex items-center justify-center gap-1 duration-200 hover:text-customWhite ${
            writerMode === WriterMode.Time ? "text-lightBlue" : ""
          }`}
          onClick={() => handleWriterModeChange(WriterMode.Time)}
        >
          <BsFillClockFill />
          time
        </button>
        <button
          onClick={() => handleWriterModeChange(WriterMode.WordCount)}
          className={` flex items-center justify-center gap-1 duration-200 hover:text-customWhite ${
            writerMode === WriterMode.WordCount ? "text-lightBlue" : ""
          }`}
        >
          <BsCCircleFill />
          words
        </button>
        <button
          className={`flex items-center justify-center gap-1 duration-200 hover:text-customWhite`}
        >
          <BsChatQuoteFill />
          quote
        </button>
      </div>

      <div className="w-0.5 bg-lightGray"></div>

      {writerMode === WriterMode.WordCount && (
        <div className="flex gap-4">
          {wordCountOptions.map((option: number) => (
            <button
              className={`duration-200 hover:text-customWhite ${
                wordsCount === option ? "text-lightBlue" : ""
              }`}
              onClick={() => handleWordCountChange(option)}
            >
              {option}
            </button>
          ))}
        </div>
      )}

      {writerMode === WriterMode.Time && (
        <div className="flex gap-4">
          {secondsOptions.map((option: number) => (
            <button
              className={`duration-200 hover:text-customWhite ${
                secondsCount === option ? "text-lightBlue" : ""
              }`}
              onClick={() => handleSecondsCountChange(option)}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Settings;
