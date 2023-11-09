import { useSelector } from "react-redux";

import { RootState } from "../../../store/Store";

import Results from "../../results/Results";
import WriterContainer from "../../writer/writerContainer/WriterContainer";
import useStatistics from "../../../hooks/useStatistics";

const Main = () => {
  useStatistics();

  const writerIsFinished: boolean = useSelector(
    (state: RootState) => state.words.isFinished,
  );

  return (
    <>
      {writerIsFinished && <Results />}

      {!writerIsFinished && <WriterContainer />}
    </>
  );
};

export default Main;
