import React, { useState } from "react";
import { ListLinkSidebar } from "../Shared/layout/Sildebar/ListLinkSidebar";
import { Outlet } from "react-router-dom";
import { Header } from "../Shared/layout/Header/Header";
// import { Rounded } from "../../assets/Rounded";
export const Root = () => {
  const [enter, setEnter] = useState(false);

  const [histry, setHistory] = useState(false);

  return (
    <div className="h-[100vh] bg-[#191E25]">
      <Header
        className={
          " h-[10%] w-[100%] px-[36px] bg-[#191E25] flex items-center "
        }
      />
      {/* estamos viendo el sm y el md */}

      <ListLinkSidebar
        className={`h-[90%] absolute  z-[1000] hover:w-[258px] pt-[34px] w-[120px] flex  bg-[#191E25]  overflow-hidden  transition-width duration-700 ease-in-out float-left   group  flex-col px-[31px]   xl:px-[31px] `}
        onMouseEnter={() => setEnter(true)}
        onMouseLeave={() => setEnter(false)}
      />

      <div className="dark:bg-[#13171d] h-[90%] flex  justify-center py-[36px] items-center ml-[120px]  rounded-tl-[32px] xl:py-6">
        <Outlet />
      </div>
    </div>
  );
};
