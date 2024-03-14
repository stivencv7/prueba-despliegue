import  { useEffect, useState } from "react";
import { IconEye } from "../../../../../assets/Icon/IconEye";
import "./SectionNavStyle.css";
export const SectionNav = ({
  onclickResume,
  onclickAccounts,
  onclickCards,
  onClickWallets,
  moreStyle,
  value,
}: {
  onclickResume?: any;
  onclickAccounts?: any;
  onclickCards?: any;
  onClickWallets?: any;
  moreStyle?: any;
  value?: any;
}) => {

  //lista con los nombres y acciones de cada seccion del nav de home
  const [items, setItems] = useState([
    { id: 1, text: "Resume", active: true, action: onclickResume },
    { id: 2, text: "Account", action: onclickAccounts },
    { id: 3, text: "Card", action: onclickCards },
    { id: 4, text: "Crypto", action: onClickWallets },
  ]);

  useEffect(()=>{
    changeActiveNavItem((value-1))
  },[value])
  
  const changeActiveNavItem = (index) => {  
    const newItems = items.map((item, i) => ({
      ...item,
      active: i === index, // Establece el estado activo solo en el índice seleccionado
    }));
    setItems(newItems);
  };

  return (
    <div className={`w-full flex justify-between    ${moreStyle} `}>
      <div className="nav-container w-[338px] flex h-[25px] xl:max-2xl:w-[60%]  justify-between text-[#A1A1A1]">
        {items.map((item, i) => (
          <div
            className={`nav-item  item-${i} ${
              item.active
                ? "active font-[700] border-b-[px] relative "
                : "font-normal "
            }`}
            onMouseUp={() => changeActiveNavItem(i)}
          >
            <button
              className="nav-item-text  leading-[20.8px]"
              onClick={item.action}
            >
              {item.text}
            </button>
          </div>
        ))}
        <div className="nav-item-highlighter " />
      </div>

      <div className=" text-body  relative">
        <span className="gap-1    font-[700] leading-[20.8px]  w-[100%]  flex flex-row items-center  mt-1 ">
          Total balance
          <IconEye />
        </span>
        <h1 className="top text-[22px]  text-end mr-1   font-[700] leading-[20.8px] w-[100px] h-[36.75px] relative -right-5 top-1">
          $80.60
        </h1>
      </div>
    </div>
  );
};
