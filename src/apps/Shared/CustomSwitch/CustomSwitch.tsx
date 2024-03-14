import React, { useState } from "react";
import { motion } from "framer-motion";
import "./CustomSwitch.css";
import ModoLight from "../../../assets/Icon/ModoLight";
import ModoDark from "../../../assets/Icon/ModoDark";
import { useTheme } from "../../../Context/UseContext/ThemeContext";

const CustomSwitch = () => {
  const [isOn, setIsOn] = useState(false);
  const { theme, toggleDarkMode } = useTheme();

  const toggleSwitch = () => {
    setIsOn(!isOn);
    toggleDarkMode();
  };

  return (
    <div
      className="switch bg-[--dark-gray] w-[60px] h-[30px] flex justify-start items-center rounded-[50px] cursor-pointer px-1"
      data-isOn={isOn}
      onClick={toggleSwitch}
    >
      <motion.div
        className="w-[24px] h-[24px] bg-[--background-dark-blue] rounded-full flex justify-center items-center p-[3px]"
        layout
        transition={spring}
      >
        <ModoLight
          className={`w-[18px] h-[18px] z-10 cursor-pointer  ${
            theme === "dark" ? "opacity-0 hidden" : "opacity-100"
          } transition duration-300 ease-in-out`}
        />
        <ModoDark
          className={`w-full h-full mt-[3px] z-10 cursor-pointer  ${
            theme === "dark" ? "opacity-100" : "opacity-0 hidden"
          } transition duration-300 ease-in-out`}
        />
      </motion.div>
    </div>
  );
};

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30,
};

export default CustomSwitch;
