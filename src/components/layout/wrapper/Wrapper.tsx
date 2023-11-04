interface IWrapperProps {
  children: JSX.Element | JSX.Element[];
}

const Wrapper = ({ children }: IWrapperProps) => {
  return (
    <div
      className="mx-auto grid h-screen w-7/12 gap-3"
      style={{ gridTemplateRows: "auto auto 1fr auto" }}
    >
      {children}
    </div>
  );
};

export default Wrapper;
