import React from "react";
import { IconNotification } from "../../../../assets/Icon/IconNotification";

import { IconCircleUser } from "../../../../assets/../assets/Icon/IconCircleUser";
import VankLogo from "../../../../assets/Icon/VankLogo";
import { IconSun } from "../../../../assets/Icon/IconSun";

export const Header = ({ className }: { className?: string }) => {
  const newLocal = <IconSun />;
  return (
    // return (
    <header className={className}>
      <div className=" w-full xl:h-[68px] flex justify-between items-center bg-[#191E25] ">
        <div className="xl:w-[160px] flex items-center xl:h-[68px]">
          <VankLogo
            className="2xl:w-[151.94px] 2xl:h-[52px] lg:w-[115px] sm:h-[29px] sm:w-[97px] absolute z-[100]  xl:w-[151.94px] xl:h-[32px]"
            fill={"#FFED00"}
          />
        </div>

        <div className="flex w-[126px] items-center justify-between xl:h-[24.77px]">
          <button>
            <IconCircleUser />
          </button>
          <button>{newLocal}</button>
          <button className="flex relative">
            <span>
              <IconNotification />
              <p className="absolute -right-2 -top-2 text-[11px] rounded-full px-[5px]   bg-[#FFED00] text-black font-bold">
                2
              </p>
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
