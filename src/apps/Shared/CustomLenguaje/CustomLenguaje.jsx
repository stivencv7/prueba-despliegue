import React, { useState } from "react";
import World2 from "../../../assets/Icon/World2";
// import Us from "../../../assets/Icon/Us";
// import CustomImage from "../CustomImage/CustomImage";
import "./CustomLenguaje.css";
import { useTranslation } from "react-i18next";

const CustomLenguaje = ({ className, toogleLenguaje }) => {
  const [t, i18n] = useTranslation("global");

  const [click, setClick] = useState(false);

  const onClick = (work) => {
    if (i18n.language === work) return setClick(false);
    // if(i18n.language)return

    toogleLenguaje();
    setClick(false);
  };

  return (
    <div
      className={`overflow-y-autos relative w-[169px] py-2 px-4 ${
        click
          ? "h-[112px] -mt-4 overflow-y-auto overflow-x-hidden bg-[#292B2D] rounded-[10px]"
          : "h-[44px] overflow-hidden bg-[#3E4347] rounded-[33px]"
      }   flex flex-col items-center justify-center cursor-pointer transition-all duration-500  ${className}`}
      onClick={() => !click && setClick(true)}
    >
      <div
        className={`w-full h-full flex items-center justify-center gap-x-2 transition-all duration-500 ${
          click ? "-translate-y-[200%] opacity-0" : "translate-y-0"
        }`}
        onClick={() => setClick(true)}
      >
        <World2 fill="#FFED00" />
        <span className="font-semibold  text-[#FFFFFF]">
          Language({i18n.language})
        </span>
      </div>
      <ul
        className={`absolute w-full flex flex-col justify-center items-center gap-y-3 transition-all duration-500  top-0 py-2 ${
          !click ? "translate-y-[200%] opacity-0" : "translate-y-0"
        }`}
      >
        <li
          className={`font-semibold  text-[#FFFFFF]  w-[169px] py-[9px] flex justify-center items-center gap-x-2 hover:bg-[#3E4347] ${
            i18n.language === "en" && "bg-[#3E4347]"
          }`}
          onClick={() => onClick("en")}
        >
          <span>English</span>
          <World2 fill="#FFED00" className="w-[16px] h-[16px]" />
        </li>
        <li
          className={`font-semibold  text-[#FFFFFF]  w-[169px] py-[9px] flex justify-center items-center gap-x-2 hover:bg-[#3E4347] ${
            i18n.language === "es" && "bg-[#3E4347]"
          }`}
          onClick={() => onClick("es")}
        >
          <span>Spanish</span>

          <World2 fill="#FFED00" className="w-[16px] h-[16px] " />
        </li>
        {/* <li
          className="font-semibold  text-[#FFFFFF] w-[169px] py-[9px] flex justify-center items-center gap-x-2 bg-slate-500 "
          onClick={onClick}
        >
          <span>Spanish</span>

          <World2 fill="#FFED00" className='w-[16px] h-[16px] '/>
        </li>
        <li
          className="font-semibold  text-[#FFFFFF] w-[169px] py-[9px] flex justify-center items-center gap-x-2 bg-slate-500 "
          onClick={onClick}
        >
          <span>Spanish</span>

          <World2 fill="#FFED00" className='w-[16px] h-[16px] '/>
        </li> */}
      </ul>
    </div>
  );
};

export default CustomLenguaje;
