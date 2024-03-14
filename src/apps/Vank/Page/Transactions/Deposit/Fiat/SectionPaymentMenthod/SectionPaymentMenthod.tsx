import React from "react";
import CustomInput from "../../../../../../Shared/CustomInput/CustomInput";

export const SectionPaymentMenthod = () => {
  return (
    <div className="h-[101px]">
      <h2>Payment method</h2>
      <CustomInput
        className={
          "bg-[#3E4347] py-[26px] px-[18px] rounded-[10px] focus:border-none w-full"
        }
      />
    </div>
  );
};
