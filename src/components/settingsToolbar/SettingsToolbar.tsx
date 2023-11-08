import { useSelector } from "react-redux";
import {
  BsCCircleFill,
  BsChatQuoteFill,
  BsFillClockFill,
  BsFillPencilFill,
  BsHash,
} from "react-icons/bs";

import { RootState, useAppDispatch } from "../../store/Store";
import {
  setNumbersAreEnabled,
  setPunctuationIsEnabled,
  setSecondsCount,
  setWordsCount,
  setWriterMode,
} from "../../store/features/SettingsSlice";

import WriterMode from "../../models/enums/WriterMode";

import {
  SECONDS_COUNT_OPTIONS,
  WORD_COUNT_OPTIONS,
} from "../../utils/constants";

const SettingsToolbar = () => {
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

  const writerIsRunning: boolean = useSelector(
    (state: RootState) => state.words.isRunning,
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

  return (
    <div
      className={`animate-slideLeft mx-auto flex w-auto animate-fadeIn select-none flex-col gap-4 self-center rounded-lg bg-darkBlue py-2  text-lightGray opacity-0 transition-all duration-200 lg:flex-row lg:px-7 ${
        writerIsRunning ? "blur-[1px]" : ""
      }`}
      style={{ animationDelay: "0.5s" }}
    >
      {(writerMode === WriterMode.WordCount ||
        writerMode === WriterMode.Time) && (
        <div className="flex justify-center gap-4 lg:px-0">
          <button
            disabled={writerIsRunning}
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
            disabled={writerIsRunning}
            onClick={() => dispatch(setNumbersAreEnabled(!numbersAreEnabled))}
            className={`flex items-center justify-center duration-200 hover:text-customWhite ${
              numbersAreEnabled ? "text-lightBlue" : ""
            }`}
          >
            <BsHash />
            numbers
          </button>
        </div>
      )}

      {(writerMode === WriterMode.WordCount ||
        writerMode === WriterMode.Time) && (
        <div className="w-0.5 bg-lightGray"></div>
      )}

      <div className="flex justify-center gap-4 px-20 lg:px-0">
        <button
          disabled={writerIsRunning}
          className={`flex items-center justify-center gap-1 duration-200 hover:text-customWhite ${
            writerMode === WriterMode.Time ? "text-lightBlue" : ""
          }`}
          onClick={() => handleWriterModeChange(WriterMode.Time)}
        >
          <BsFillClockFill />
          time
        </button>
        <button
          disabled={writerIsRunning}
          onClick={() => handleWriterModeChange(WriterMode.WordCount)}
          className={` flex items-center justify-center gap-1 duration-200 hover:text-customWhite ${
            writerMode === WriterMode.WordCount ? "text-lightBlue" : ""
          }`}
        >
          <BsCCircleFill />
          words
        </button>
        <button
          disabled={writerIsRunning}
          onClick={() => handleWriterModeChange(WriterMode.Quote)}
          className={` flex items-center justify-center gap-1 duration-200 hover:text-customWhite ${
            writerMode === WriterMode.Quote ? "text-lightBlue" : ""
          }`}
        >
          <BsChatQuoteFill />
          quote
        </button>
      </div>

      {(writerMode === WriterMode.WordCount ||
        writerMode === WriterMode.Time) && (
        <div className="w-0.5 bg-lightGray"></div>
      )}

      {writerMode === WriterMode.WordCount && (
        <div className="flex justify-center gap-4 px-7 lg:px-0">
          {WORD_COUNT_OPTIONS.map((option: number, i: number) => (
            <button
              key={option + i}
              disabled={writerIsRunning}
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
        <div className="flex justify-center gap-4 lg:px-0">
          {SECONDS_COUNT_OPTIONS.map((option: number, i: number) => (
            <button
              key={option + i}
              disabled={writerIsRunning}
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

export default SettingsToolbar;
