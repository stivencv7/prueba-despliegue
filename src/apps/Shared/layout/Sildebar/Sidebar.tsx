import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
// import {Rounded} from "../../../../assets/Rounded";
export const Sidebar = ({
  className,
  listLinksHeader = [],
  listLinksFooter = [],
  rounded,
  onMouseEnter,
  onMouseLeave,
}: {
  className?: string;
  listLinksHeader?: any[];
  listLinksFooter?: any[];
  rounded?: any;
  onMouseEnter?: any;
  onMouseLeave?: any;
}) => {
  const languages = [
    { language: "Spanish", status: false },
    { language: "English", status: false },
  ];

  const [visibleSidevar, setVisibleSidebar] = useState(false);

  const handleVisible = () => {
    alert("hola");

    setVisibleSidebar(true);
  };

  const w = 258;

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={className}
    >
      {rounded}
      {/* <Rounded
        fill={'wi'}
        className="absolute 2xl:-top-[5px] 2xl:-right-[55px] md:-top-[17px] md:-right-[55px]  "
      />
      */}
      {/* pb-15px */}
      <nav className="h-[87%] flex flex-col justify-between 2xl:pt-[40px] sm:pt-20 xl:pt-[50px]  group-hover:w-[100%] ">
        <div className="h-full flex flex-col  pb-[0px] justify-between group-hover:w-full ">
          <ul className="media-sidebar-icons1 flex flex-col 2xl:gap-[36px] lg:gap-5 sm:gap-[36px] xl:gap-[36px]   group-hover:w-full ">
            {listLinksHeader.map((index) => (
              <NavLink
                key={index.id}
                to={`/${index.path}`}
                className={`group-hover: ${index.className} flex items-center  h-[25px]   w-[186px]  gap-[4px]  text-icons `}
              >
                <p className="w-[1px]  h-[18px] pl-5 text-type">{index.icon}</p>
                <p className="  mt-2   pr-[0px]  relative -right-10   h-full  duration-500 group-hover:block opacity-0 group-hover:opacity-100">
                  {index.text}
                </p>
              </NavLink>
            ))}
          </ul>

          <ul className="relative flex flex-col xl:h-[170px] xl:py-3 xl:justify-between  group-hover:xl:h-[220px] md:h-[170px] md:justify-between group-hover:gap-[20px]   w-[186px]   justify-end ">
            {listLinksFooter.map((item) => (
              <div
                className={` pl-5 ${
                  item.id != 3
                    ? "group-hover:ml-2 cursor-pointer group-hover:bg-[#3E4347] group-hover:p-[10px] group-hover:pl-[35px] group-hover:w-[169px] group-hover:rounded-[33px]  "
                    : "group-hover:pl-[0px]"
                } `}
                onClick={
                  item.id === 1
                    ? () =>
                        setVisibleSidebar((): any => {
                          visibleSidevar
                            ? setVisibleSidebar(false)
                            : setVisibleSidebar(true);
                        })
                    : undefined
                }
              >
                <button
                  className={`text-[#EFF0F1] ${
                    item.id != 3 ? "flex justify-around gap-2" : ""
                  }`}
                  onClick={
                    item.id === 1
                      ? () =>
                          setVisibleSidebar((): any => {
                            visibleSidevar
                              ? setVisibleSidebar(false)
                              : setVisibleSidebar(true);
                          })
                      : undefined
                  }
                >
                  <p className={`${item.id != 3 ? "" : "group-hover:hidden "}`}>
                    {item.icon}
                  </p>
                  <p
                    className={`${
                      item.id != 3
                        ? ""
                        : "text-[12px] font-[700] leading-[15.6px]  text-center w-[217px] relative left-[-14px]"
                    } hidden group-hover:block`}
                  >
                    {item.text}
                  </p>
                </button>
              </div>
            ))}

            <ul
              className={`${
                visibleSidevar
                  ? "block opacity-0 group-hover:opacity-100"
                  : "hidden "
              } top-0 right-2 gap-[6px] bg-[#232428] w-[170px] h-[122px] absolute text-[#FFFFFF] text-[16px] flex flex-col items-center justify-center rounded-[12px]`}
            >
              {languages.map((item, index) => (
                <li
                  className="hover:bg-[#3E4347] py-[10px] px-[50px] cursor-pointer "
                  onClick={() =>
                    setVisibleSidebar((): any => {
                      visibleSidevar
                        ? setVisibleSidebar(false)
                        : setVisibleSidebar(true);
                    })
                  }
                >
                  {item.language}
                </li>
              ))}
            </ul>
          </ul>
        </div>
      </nav>
    </div>
  );
};
