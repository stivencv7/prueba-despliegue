import React from "react";
import CustomButton from "../../../../../../Shared/CustomButton/CustomButton";

export const SectionBtn = ({ className }: { className?: string }) => {
  return (
    <div className={className}>
      <div className="flex h-[36px] gap-[64px]">
        <CustomButton
          className={"w-[243px]  h-[36px] rounded-[33px] bg-[#3E4347]"}
          label={"Clear"}
        />
        <CustomButton
          className={
            "w-[243px] h-[36px] rounded-[33px] bg-[#FFED00] text-[16px] leading-[20.8px] text-center font-[700px] text-[#14181F]"
          }
          label={"Continue"}
        />
      </div>
    </div>
  );
};
