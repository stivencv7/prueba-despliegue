import React from "react";

export const CardItem = ({ image, text, amount, subtext,moreStyle }) => {
  return (
    <div className={`card flex bg-[#3E4347] justify-between hover:bg-[#5E6061] cursor-pointer px-[12px] py-[6px] rounded-[41px] items-center h-[46px]  xl:max-2xl:h-[42px]  ${moreStyle}`}>
      
      <div className="flex items-center  w-[526px] hidden-[36px] justify-between">
        <div className="flex gap-[10px] h-[36px]  items-center">
          <img
            src={image} 
            alt=""
            className=" w-[36px] h-[36px] xl:max-2xl:h-[30px] xl:max-2xl:w-[30px] rounded-full  "
          />

          <span className={`flex flex-col   justify-center  ${subtext ? "mt-1" : ""} `}
          >
            <p className=" font-[700] text-[14px] leading-[18.2px]"> {text}</p>
            <p className="text-[14px] font-normal leading-[18.2px] relative -top-1 sub-text-crypto ">
              {subtext}
            </p>
          </span>
        </div>

        <div className=" font-normal  leading-[20.8px]">{amount}</div>
      </div>
    </div>
  );
};
