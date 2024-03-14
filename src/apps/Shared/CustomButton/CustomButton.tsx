import { motion } from "framer-motion";
import React from "react";

const CustomButton = ({
  className,
  children,
  label,
  onclick,
  rest,
  disabled,
}: {
  className?: string;
  children?: any;
  label?: any;
  onclick?: () => void;
  rest?: any;
  disabled?: boolean;
}) => {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      className={className}
      onClick={onclick}
      {...rest}
      disabled={disabled}
    >
      {children || label}
    </motion.button>
  );
};

export default CustomButton;
