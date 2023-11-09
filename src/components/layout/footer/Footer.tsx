import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      className="mx-auto flex w-4/5 select-none items-center justify-center py-5 font-medium text-lightGray"
      style={{ gridRow: 8 }}
      initial={{ opacity: 0, translateY: "250px" }}
      animate={{ opacity: 1, translateY: "0px" }}
      transition={{ duration: 0.5, delay: 1.5 }}
    >
      <a
        href="https://github.com/radoslavvv/typeR"
        className="duration-300 hover:text-customWhite"
      >
        {"</> GitHub"}
      </a>
    </motion.footer>
  );
};

export default Footer;
