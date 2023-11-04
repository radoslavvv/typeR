import { useSelector } from "react-redux";
import { RootState } from "../../../store/Store";
import WriterContainer from "../../writer/writerContainer/WriterContainer";

const Main = () => {
  const writerIsFinished: boolean = useSelector(
    (state: RootState) => state.words.isFinished,
  );

  return <>{!writerIsFinished && <WriterContainer />}</>;
};

export default Main;
