import React, { useEffect, useState } from "react";
import IconArrow from "../../../../../../../assets/Icon/IconArrow";
import CustomInput from "../../../../../../Shared/CustomInput/CustomInput";
import flagColombia from "../../../../../../../assets/Icon/colombia.png";
import flagUnited from "../../../../../../../assets/Icon/united-states.png";
import flagchile from "../../../../../../../assets/Icon/chile.png";
import flagPeru from "../../../../../../../assets/Icon/peru.png";
import CustomButton from "../../../../../../Shared/CustomButton/CustomButton";
export const SectionChooseCurrency = () => {
  const [visible, setVisble] = useState(false);

  const ChooseCurrency = [
    { flag: <img src={flagUnited} alt="" />, text: "USD" },
    { flag: <img src={flagColombia} alt="" />, text: "COP" },
    { flag: <img src={flagchile} alt="" />, text: "CLP" },
    { flag: <img src={flagPeru} alt="" />, text: "PEN" },
    { flag: <img src={flagPeru} alt="" />, text: "USD" },
  ];

  const deploy = () => {
    if (visible) {
      setVisble(false);
    } else {
      setVisble(true);
    }
  };

  return (
    <div className="flex  justify-between items-center w-[100%] h-[94px]">
      <div className="flex flex-col  h-[94px] w-[171px] py-[9px] gap-[13px] ">
        <h2>Choose currency</h2>
        <nav className="">
          <ul
            onClick={() => deploy()}
            className={`transition-heigth duration-500 ${
              visible ? " h-[212px]  bg-[#5E6061]" : "bg-[#3E4347]"
            } pb-[12px] w-[163px] h-[39px] overflow-hidden  rounded-[12px] absolute z-0 `}
          >
            {ChooseCurrency.map((item, index) => (
              <li
                key={index}
                className={`${
                  visible ? "hover:bg-[#3E4347]" : "hover:bg-[#5E6061]"
                } flex  h-[36px] gap-[24px] w-[163px]   py-[8px]  px-[12px] `}
              >
                {item.flag}
                {item.text}
              </li>
            ))}
            {/* <span className="text-red">*</span> */}
          </ul>
        </nav>
      </div>

      <div>
        <IconArrow className={"relative top-[16px]"} />
      </div>

      <div className="flex flex-col  h-[94px] py-[9px] gap-[13px] ">
        <h2 className="text-[#FFED00] text-[16px] leading-[20.8px] font-normal">
          1 USDT = $ 1 USD
        </h2>
        <CustomButton
          className={
            "rounded-[10px] w-[241px] h-[36px] bg-[#3E4347] focus-visible:border-[#D6CA5C3D] hover:border-[2px] border-[#D6CA5C3D]"
          }
        />
      </div>
    </div>
  );
};
// bg-[#5E6061]
