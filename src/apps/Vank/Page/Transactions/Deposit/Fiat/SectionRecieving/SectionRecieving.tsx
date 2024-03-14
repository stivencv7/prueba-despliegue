import React from "react";
import CustomInput from "../../../../../../Shared/CustomInput/CustomInput";
import IconArrow from "../../../../../../../assets/Icon/IconArrow";
import usdt from "../../../../../../../assets/Icon/usdt.jpeg";
import CustomButton from "../../../../../../Shared/CustomButton/CustomButton";

const SectionRecieving = () => {
  return (
    <div className="flex  justify-between items-center h-[94px] w-full ">
      <div className="flex flex-col justify-center   h-[94px] w-[171px] py-[9px] gap-[13px]">
        <h2 className="">Recieving to</h2>

        <div className="flex items-center   rounded-[10px] h-[36px] gap-[24px] w-[163px] z-5 bg-[#3E4347] py-[8px] px-[12px]">
          <img src={usdt} alt="" className="rounded-[100%] w-[30px] h-[30px]" />
          <label>USDT</label>
        </div>
      </div>

      <div>
        <IconArrow className={"relative top-[16px]"} />
      </div>
      <div className="flex flex-col  h-[94px] py-[9px] gap-[13px] ">
        <h2>Recieving</h2>
        <CustomButton
          className={
            "rounded-[10px] w-[241px] h-[36px] bg-[#3E4347] focus-visible:border-[#D6CA5C3D] hover:border-[2px] border-[#D6CA5C3D]"
          }
        />
      </div>
    </div>
  );
};

export default SectionRecieving;
