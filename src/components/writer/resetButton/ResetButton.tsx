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
        className="mx-auto mt-10 flex w-6 cursor-pointer justify-start"
        onClick={handleResetButtonClick}
      >
        <BsArrowClockwise className="duration-250 mx-auto  flex justify-start text-2xl font-bold text-lightGray transition-all hover:scale-125 hover:text-customWhite" />
      </div>
    </div>
  );
};

export default ResetButton;
