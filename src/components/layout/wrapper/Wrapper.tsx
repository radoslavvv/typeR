interface IWrapperProps {
  children: JSX.Element | JSX.Element[];
}

const Wrapper = ({ children }: IWrapperProps) => {
  return <div className="w-4/5 mx-auto">{children}</div>;
};

export default Wrapper;
