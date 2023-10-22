import { useSelector } from "react-redux";
import CursorPosition from "../../../models/CursorPosition";
import { RootState } from "../../../store/Store";

const Cursor = () => {
  const cursorPosition: CursorPosition = useSelector(
    (state: RootState) => state.words.cursorPosition,
  );

  return (
    <span className="border-1 transition-all: duration\ border-l border-solid"></span>
  );
};

export default Cursor;
