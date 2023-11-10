import useCursor from "../../../hooks/useCursor";

const Cursor = () => {
  const { cursorTop, cursorLeft } = useCursor();

  const isMobileDevice: boolean =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    );

  return (
    !isMobileDevice && (
      <span
        className="absolute h-6 rounded-full border border-solid border-lightBlue duration-300"
        style={{ top: cursorTop, left: cursorLeft }}
      ></span>
    )
  );
};

export default Cursor;
