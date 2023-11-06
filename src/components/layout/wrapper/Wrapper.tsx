interface IWrapperProps {
  children: JSX.Element | JSX.Element[];
}

const Wrapper = ({ children }: IWrapperProps) => {
  return (
    <div
      className="mx-auto grid h-screen w-11/12 gap-3 lg:w-7/12"
      style={{ gridTemplateRows: "auto auto 1fr auto" }}
    >
      {children}
    </div>
  );
};

export default Wrapper;
