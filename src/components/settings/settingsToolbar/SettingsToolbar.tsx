import { useSelector } from "react-redux";
import {
  BsCCircleFill,
  BsChatQuoteFill,
  BsFillClockFill,
  BsFillPencilFill,
  BsHash,
} from "react-icons/bs";

import { RootState, useAppDispatch } from "../../../store/Store";
import {
  setNumbersAreEnabled,
  setPunctuationIsEnabled,
  setSecondsCount,
  setWordsCount,
  setWriterMode,
} from "../../../store/features/SettingsSlice";

import WriterMode from "../../../models/enums/WriterMode";

import {
  SECONDS_COUNT_OPTIONS,
  WORD_COUNT_OPTIONS,
} from "../../../utils/constants";
import { motion } from "framer-motion";
import SettingsButton from "../settingsButton/SettingsButton";

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
    (state: RootState) => state.writer.isRunning,
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
    <motion.div
      className={`mx-auto flex w-auto max-w-[80vw] select-none flex-col gap-4 self-center rounded-lg bg-darkBlue  py-2 text-lightGray lg:flex-row lg:px-7 ${
        writerIsRunning ? "blur-[1px]" : ""
      }`}
      initial={{ opacity: 0, translateX: "-250px" }}
      animate={{ opacity: 1, translateX: "0px" }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      {(writerMode === WriterMode.WordCount ||
        writerMode === WriterMode.Time) && (
        <div className="flex justify-center gap-4 lg:px-0">
          <SettingsButton
            icon={<BsFillPencilFill />}
            label="punctuation"
            isActive={punctuationIsEnabled}
            onClick={() =>
              dispatch(setPunctuationIsEnabled(!punctuationIsEnabled))
            }
          />
          <SettingsButton
            icon={<BsHash />}
            label="numbers"
            isActive={numbersAreEnabled}
            onClick={() => dispatch(setNumbersAreEnabled(!numbersAreEnabled))}
          />
        </div>
      )}

      {(writerMode === WriterMode.WordCount ||
        writerMode === WriterMode.Time) && (
        <div className="w-0.5 bg-lightGray"></div>
      )}

      <div className="flex justify-center gap-4 px-20 lg:px-0">
        <SettingsButton
          icon={<BsFillClockFill />}
          label="time"
          isActive={writerMode === WriterMode.Time}
          onClick={() => handleWriterModeChange(WriterMode.Time)}
        />
        <SettingsButton
          icon={<BsCCircleFill />}
          label="words"
          isActive={writerMode === WriterMode.WordCount}
          onClick={() => handleWriterModeChange(WriterMode.WordCount)}
        />
        <SettingsButton
          icon={<BsChatQuoteFill />}
          label="quote"
          isActive={writerMode === WriterMode.Quote}
          onClick={() => handleWriterModeChange(WriterMode.Quote)}
        />
      </div>

      {(writerMode === WriterMode.WordCount ||
        writerMode === WriterMode.Time) && (
        <div className="w-0.5 bg-lightGray"></div>
      )}

      {writerMode === WriterMode.WordCount && (
        <div className="flex justify-center gap-4 px-7 lg:px-0">
          {WORD_COUNT_OPTIONS.map((option: number, i: number) => (
            <SettingsButton
              key={option + i}
              label={option.toString()}
              isActive={wordsCount === option}
              onClick={() => handleWordCountChange(option)}
            />
          ))}
        </div>
      )}

      {writerMode === WriterMode.Time && (
        <div className="flex justify-center gap-4 lg:px-0">
          {SECONDS_COUNT_OPTIONS.map((option: number, i: number) => (
            <SettingsButton
              key={option + i}
              label={option.toString()}
              isActive={secondsCount === option}
              onClick={() => handleSecondsCountChange(option)}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default SettingsToolbar;
