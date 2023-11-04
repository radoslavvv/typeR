import { BsFillKeyboardFill } from "react-icons/bs";

const Header = () => {
  return (
    <header className="select-none py-7 text-3xl font-medium text-customWhite">
      <div className="flex items-center justify-start  gap-3">
        <BsFillKeyboardFill className="text-4xl text-lightBlue" /> typeR
      </div>
    </header>
  );
};

export default Header;
