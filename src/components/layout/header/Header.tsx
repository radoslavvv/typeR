import { motion } from "framer-motion";
import { BsFillKeyboardFill } from "react-icons/bs";

import { useAppDispatch } from "../../../store/Store";
import { reset } from "../../../store/features/WordsSlice";

const Header = () => {
  const dispatch = useAppDispatch();

  const handleLogoClick = (): void => {
    dispatch(reset());
  };

  return (
    <motion.header
      className="select-none py-7 text-3xl font-medium text-customWhite"
      initial={{ opacity: 0, translateY: "-250px" }}
      animate={{ opacity: 1, translateY: "0px" }}
      transition={{ duration: 0.5 }}
    >
      <div
        onClick={handleLogoClick}
        className="flex cursor-pointer items-center  justify-start gap-3"
      >
        <BsFillKeyboardFill className="text-4xl text-lightBlue" /> typeR
      </div>
    </motion.header>
  );
};

export default Header;
