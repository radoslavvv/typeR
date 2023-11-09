import { BsArrowClockwise } from "react-icons/bs";

import { useAppDispatch } from "../../../store/Store";
import { reset } from "../../../store/features/WriterSlice";
import { motion } from "framer-motion";

const ResetButton = () => {
  const dispatch = useAppDispatch();

  const handleResetButtonClick = (): void => {
    dispatch(reset());
  };

  return (
    <motion.div
      initial={{ opacity: 0, translateY: "250px" }}
      animate={{ opacity: 1, translateY: "0px" }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      <div
        className="mx-auto mt-10 flex w-6 cursor-pointer justify-start "
        onClick={handleResetButtonClick}
      >
        <BsArrowClockwise className="duration-250 mx-auto  flex justify-start text-2xl font-bold text-lightGray transition-all hover:scale-125 hover:text-customWhite" />
      </div>
    </motion.div>
  );
};

export default ResetButton;
