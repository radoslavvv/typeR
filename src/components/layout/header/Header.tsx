import { BsFillKeyboardFill } from "react-icons/bs";

const Header = () => {
  return (
    <header className="py-7 text-customWhite text-3xl font-medium">
      <div className="flex justify-start items-center  gap-3">
        <BsFillKeyboardFill className="text-lightBlue text-4xl" /> typeR
      </div>
    </header>
  );
};

export default Header;
