import { useEffect, useState } from "react";
import { SectionNav } from "./SectionNav/SectionNav";
import { SectionAccounts } from "./SectionAccounts/SectionAccounts";
import { SectionCards } from "./SectionCards/SectionCards";
import { SectionCryto } from "./SectionCryto/SectionCryto";

const Home = () => {
  const [value, setValue] = useState(1);

  useEffect(() => {
    console.log(value);
  }, [value]);

  return (
    <div className="panel responsive-home 2xl:h-[708px] 2xl:w-[622px]   xl:w-[45%]  xl:h-full   xl:p-[24px]  bg-[#191E25] 2xl:p-[36px]  text-body    rounded-[32px]  max-sm:h-[100%] max-lg:h-[100%]  max-sm:p-[36px] max-lg:p-[36px] ">
      <div className="pane-content1 2xl:w-[550px] 2xl:h-full flex flex-col xl:h-full overflow-hidden">
        <SectionNav
          value={value}
          onclickResume={() => {
            setValue(1);
          }}
          onclickAccounts={() => {
            setValue(2);
          }}
          onclickCards={() => {
            setValue(3);
          }}
          onClickWallets={() => {
            setValue(4);
          }}
        />
        <div
          className={`responsive-home-cards  2xl:w-full 2xl:h-[580px]   flex flex-col   relative justify-between  max-2xl:h-[28.1713rem] xl:h-full max-sm:justify-between max-sm:h-[100%] max-lg:justify-between max-lg:h-[100%] `}
        >
          {value === 1 || value === 2 ? (
            <SectionAccounts onclik={()=>setValue(2)}
              moreStyle={`block  transition-opacity duration-700 trasaction-display duration-1000 ${
                value !== 1 ? "absolute top-0 left-0 right-0" : ""
              }`}
            />
          ) : (
            <SectionAccounts moreStyle={"opacity-0"} onclik={''}/>
          )}
          {value === 1 || value === 3 ? (
            <SectionCards onclik={()=>setValue(3)}
              moreStyle={`block transition-opacity duration-700 trasaction-display duration-1000  ${
                value !== 1 ? "absolute top-0 left-0 right-0 " : ""
              }`}
            />
          ) : (
            <SectionCards moreStyle={"opacity-0"} onclik={''}/>
          )}
          {value === 1 || value === 4 ? (
            <SectionCryto onclick={()=>setValue(4)}
              moreStyle={`block transition-opacity duration-700    ${
                value !== 1 ? "absolute   ":""
              }`}
            />
          ) : (
            <SectionCryto moreStyle={"opacity-0 "} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
