/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";

import Cursor from "../cursor/Cursor";
import WordsList from "../wordsList/WordsList";
import Timer from "../../countdown/timer/Timer";
import ResetButton from "../resetButton/ResetButton";
import WordCounter from "../../countdown/wordCounter/WordCounter";
import SettingsToolbar from "../../settings/settingsToolbar/SettingsToolbar";

import useWriter from "../../../hooks/useWriter";

import Word from "../../../models/Word";
import WriterMode from "../../../models/enums/WriterMode";
import MobileKeyboard from "../mobileKeyboard/MobileKeyboard";

const WriterContainer = () => {
  const { writerMode, words } = useWriter();

  const rawWords: string[] = words.map((w: Word) => w.content);

  const isMobileDevice: boolean =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    );

  return (
    <>
      <SettingsToolbar />

      <motion.div
        key={JSON.stringify(rawWords)}
        className=" mt-20 flex max-w-[100%] flex-col justify-start md:mt-52"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.75 }}
      >
        {(writerMode === WriterMode.WordCount ||
          writerMode === WriterMode.Quote) && <WordCounter />}
        {writerMode === WriterMode.Time && <Timer />}

        <WordsList words={words} />
        <Cursor />
      </motion.div>

      <ResetButton />

      {isMobileDevice && <MobileKeyboard />}
    </>
  );
};

export default WriterContainer;
