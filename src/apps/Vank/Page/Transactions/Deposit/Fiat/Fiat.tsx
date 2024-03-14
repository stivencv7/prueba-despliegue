import React, { useState } from "react";
import { SectionChooseCurrency } from "./SectionChooseCurrency/SectionChooseCurrency";
import IconLindkWithdraw from "../../../../../../assets/Icon/IconLindkWithdraw";
import SectionRecieving from "./SectionRecieving/SectionRecieving";
import { SectionPaymentMenthod } from "./SectionPaymentMenthod/SectionPaymentMenthod";
import { SectionBtn } from "./SectionBtn/SectionBtn";

export const Fiat = ({ className }: { className?: string }) => {
  /*Estado que nos permite darle estilos al enlace de Withdraw
  Estos estilos se aplican cuando pasamos el curso*/
  const [iconLindkWithdraw, setIconLindkWithdraw] = useState(false);

  return (
    <div className={'w-[100%]'}>
      <div className="w-[100%] h-[368px] flex flex-col justify-between  ">
        <SectionChooseCurrency />
        <div className="flex items-center gap-4 font-normal text-[14px] leading-[18.2px] text-[#9D9DA2] h-[45px]">
          <div className="w-[43px] h-[43px] flex items-center justify-center">
            <IconLindkWithdraw
              onMouseLeave={() => setIconLindkWithdraw(false)}
              onMouseEnter={() => setIconLindkWithdraw(true)}
              fill={""}
              className={`cursor-pointer ${
                iconLindkWithdraw
                  ? "w-[43px] h-[43px] rounded-[100%] bg-[#3E4347] hover:bg-[#5E6061]"
                  : ""
              }bg-[#3E4347] rounded-[100%]  transition-heigth duration-500 hover:h-[43px] hover:bg-[#5E6061]`}
            />
          </div>
          <p
            onMouseLeave={() => setIconLindkWithdraw(false)}
            onMouseEnter={() => setIconLindkWithdraw(true)}
            className={`cursor-pointer ${
              iconLindkWithdraw ? "text-body " : ""
            }`}
          >
            Switch to Withdraw
          </p>
        </div>
        <SectionRecieving />
        <SectionPaymentMenthod />
      </div>

      {/* <SectionBtn className={"flex h-[81px] gap-[24px]"} /> */}
    </div>
  );
};
