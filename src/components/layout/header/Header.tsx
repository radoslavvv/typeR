import { BsFillKeyboardFill } from "react-icons/bs";

import { useAppDispatch } from "../../../store/Store";
import { reset } from "../../../store/features/WordsSlice";

const Header = () => {
  const dispatch = useAppDispatch();

  const handleLogoClick = (): void => {
    dispatch(reset());
  };

  return (
    <header className="select-none py-7 text-3xl font-medium text-customWhite">
      <div
        onClick={handleLogoClick}
        className="flex cursor-pointer items-center  justify-start gap-3 hover:animate-logoHover"
      >
        <BsFillKeyboardFill className="text-4xl text-lightBlue" /> typeR
      </div>
    </header>
  );
};

export default Header;
