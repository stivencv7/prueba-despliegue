import React from "react";

const AuthSkeleton = () => {
  return (
    <div className="absolute h-screen w-full left-0 top-0 z-50 flex justify-center items-center overflow-hidden dark:bg-[#13171d] text-white ">
      <div className="hidden h-full w-[52%] 2xl:w-[55%] xl:flex flex-col items-center justify-center bg-transparent transition-all duration-300 ">
        <div className="w-[450px] h-[250px] flex flex-col justify-center items-center z-50">
            Vank
        </div>
      </div>
      {/* <div className="h-full w-full md:w-[70%] lg:w-[48%] 2xl:w-[41%] flex justify-center items-center  bg-transparent transition-all duration-300"></div> */}
    </div>
  );
};

export default AuthSkeleton;
