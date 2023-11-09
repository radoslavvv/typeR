interface ISettingsButtonProps {
  icon?: React.ReactNode;
  label: string;
  isEnabled?: boolean;
  isActive?: boolean;
  onClick: () => void;
}
const SettingsButton = ({
  icon,
  label,
  isEnabled,
  isActive,
  onClick,
}: ISettingsButtonProps) => {
  return (
    <button
      disabled={isEnabled}
      className={`flex items-center justify-center gap-1 duration-200 hover:text-customWhite ${
        (isEnabled && "text-lightBlue") || (isActive && "text-lightBlue") || ""
      }`}
      onClick={onClick}
    >
      {icon}
      {label}
    </button>
  );
};

export default SettingsButton;
