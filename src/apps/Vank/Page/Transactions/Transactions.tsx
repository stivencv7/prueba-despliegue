import React, { useEffect, useState } from "react";
import { SectionNav } from "./SectionNav/SectionNav";
import { Deposit } from "./Deposit/Deposit";
// import { Deposit } from "./Deposit/Deposit";
import { VankPay } from "./VankPay/VankPay";
import { History } from "../../../Shared/History/History";

const Transactions = () => {
  const [value, setValue] = useState(1);
  const [selectView, setSelectView] = useState(1);
  const [viewHistory, setViewHistory] = useState(0);

  useEffect(() => {
    setSelectView(1);
  }, [value]);

  //ver history
  const handleViewHistory = () => {
    if (viewHistory == 0) {
      setViewHistory(4);
    } else {
      setViewHistory(0);
    }
  };

  return (
    <div
      className={`responsive-transaction-main h-[708px] relative w-full xl:max-2xl:h-[100%] xl:max-2xl:w-[90%]  max-sm:h-[100%] max-lg:h-[100%]  flex items-center justify-center    ${
        viewHistory > 0 ? " gap-[36px] transition-gap duration-1000 ease-in-out" : ""
      } `}
    >
      <div className={`responsive-transaction h-full  w-[622px] responsive-transaction-medium  xl:max-2xl:gap-[12px]  relative z-50  transition-transform duration-1000 ease-out  bg-[#191E25] p-[36px]  flex flex-col  gap-[32px]  text-body  rounded-[32px] max-2xl:w-[520px] ${viewHistory==4?'transition-transform -translate-x-10':'transition-transform translate-x-0'}`}>
        <div className="responsive-transaction responsive-transaction-medium  xl:max-2xl:gap-[12px]   w-[100%] h-[73px] flex flex-col gap-[32px] ">
          <SectionNav
            className={"flex flex-col gap-[32px] h-[19px] "}
            onClikVanPay={() => setValue(4)}
            onClickDeposit={() => setValue(1)}
            apply={value}
          />
          {
            <ul className="flex w-[139px]  justify-between text-link font-[700] text-[16px]  xl:max-2xl:text-sm">
              {value == 1 && (
                <>
                  <li>
                    <button
                      onClick={() => setSelectView(1)}
                      className={`${
                        selectView == 1 && "border-b-[1px] text-body"
                      }`}
                    >
                      Fiat
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setSelectView(2)}
                      className={`${
                        selectView == 2 && "border-b-[1px] text-body"
                      }`}
                    >
                      Crypto
                    </button>
                  </li>
                </>
              )}
              {value == 4 && (
                <>
                  <li>
                    <button
                      onClick={() => setSelectView(1)}
                      className={`${
                        selectView == 1 && "border-b-[1px] text-body"
                      }`}
                    >
                      Send
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setSelectView(2)}
                      className={`${
                        selectView == 2 && "border-b-[1px] text-body"
                      }`}
                    >
                      Receive
                    </button>
                  </li>
                </>
              )}
            </ul>
          }
        </div>

        {value == 1 && (
        <Deposit selectView={selectView} 
        veiwHistorial={() =>setViewHistory(viewHistory==4?0:4)}
        />)}
        {value == 4 && (
          <VankPay
            selectView={selectView}
            veiwHistorial={() => setViewHistory(viewHistory==4?0:4)}
          />
        )}
      </div>

      {<History value={value} 
      moreStyle={`${viewHistory==4?' opacity-100 transition-opacity duration-700 ease-in-out relative':' opacity-0 transition-opacity duration-700  z-0 absolute'}`}
      onClickBlack={()=>setViewHistory(0)}
      />
      }
    </div>
  );
};

export default Transactions;
