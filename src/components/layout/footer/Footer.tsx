const Footer = () => {
  return (
    <footer
      className="mx-auto flex w-4/5 animate-slideUp select-none items-center justify-center py-5 font-medium text-lightGray opacity-0"
      style={{ animationDelay: "1.75s", gridRow: 8 }}
    >
      <a href="#" className="duration-300 hover:text-customWhite">
        {"</> GitHub"}
      </a>
    </footer>
  );
};

export default Footer;
