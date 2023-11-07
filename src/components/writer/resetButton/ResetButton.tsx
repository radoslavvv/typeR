import { BsArrowClockwise } from "react-icons/bs";
import { useAppDispatch } from "../../../store/Store";
import { reset } from "../../../store/features/WordsSlice";

const ResetButton = () => {
  const dispatch = useAppDispatch();

  const handleResetButtonClick = (): void => {
    dispatch(reset());
  };

  return (
    <div>
      <div
        className="mx-auto mt-10 flex justify-start "
        onClick={handleResetButtonClick}
      >
        <BsArrowClockwise className="duration-250 mx-auto mt-10 flex justify-start text-2xl font-bold text-lightGray transition-all hover:scale-125" />
      </div>
    </div>
  );
};

export default ResetButton;
