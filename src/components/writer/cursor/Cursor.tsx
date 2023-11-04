import useCursor from "../../../hooks/useCursor";

const Cursor = () => {
  const { cursorTop, cursorLeft } = useCursor();

  return (
    <span
      className="absolute h-6 rounded-full border border-solid border-lightBlue duration-200"
      style={{ top: cursorTop, left: cursorLeft }}
    ></span>
  );
};

export default Cursor;
