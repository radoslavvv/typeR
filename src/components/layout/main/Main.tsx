/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";

import { RootState } from "../../../store/Store";

import Results from "../../results/Results";
import WriterContainer from "../../writer/writerContainer/WriterContainer";

import useStatistics from "../../../hooks/useStatistics";
import React from "react";

const Main = () => {
  const hiddenInputRef = React.useRef<any>(null);

  useStatistics();

  const writerIsFinished: boolean = useSelector(
    (state: RootState) => state.writer.isFinished,
  );

  React.useEffect(() => {
    const isMobileDevice: boolean =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      );

    if (isMobileDevice && hiddenInputRef && hiddenInputRef.current) {
      hiddenInputRef.current.focus();
    }
  }, []);

  return (
    <>
      {writerIsFinished ? <Results /> : <WriterContainer />}

      <input
        ref={hiddenInputRef}
        type="text"
        style={{ position: "absolute", top: "-1000px" }}
      />
    </>
  );
};

export default Main;
