interface IWrapperProps {
  children: JSX.Element | JSX.Element[];
}

const Wrapper = ({ children }: IWrapperProps) => {
  return (
    <div className="mx-auto flex h-screen w-9/12 flex-col justify-between">
      {children}
    </div>
  );
};

export default Wrapper;
