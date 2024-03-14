import React, { useEffect, useState } from "react";
import CustomButton from "../CustomButton/CustomButton";
import usd from "../../../assets/images/USD.png";
import eth from "../../../assets/images/eth.jpeg";
import btc from "../../../assets/images/Bitcoin.jpeg";
import usdt from "../../../assets/images/usdt.jpeg";
import { use } from "i18next";
import { convertir, findById } from "../../service/ServiceTransaction/ServiceTransaction";

export const CustomSelect = ({
  label,
  classNameLabel,
  classNameMain,
  classNameContentBtn,
  classNameIcon,
  classNameText,
  classNameSubText,
  classNameDivImgText,
  classNameSpanOne,
  classNameIconList,
  classNameSpanList,
  classNameValue,
  classNameValueText,
  data,
}) => {
  const [object, setObject] = useState({
    icon: "",
    text: "",
    subText: "",
    value: 0,
    valueText: "",
  });

  const [veiw, setVeiw] = useState();
  //estado de mondeda USD
  const [monyConvertion, setMonyConVertion] = useState();
   //estado de mondeda Eth
  const [monyConvertionusEth, setMonyConVertionEth] = useState();
   //estado de mondeda BTC
  const [monyConvertionBTC, setMonyConVertionBTC] = useState();
   //estado de mondeda USDT
  const [monyConvertionUSDT, setMonyConVertionUSDT] = useState();
  //estado de user 
  const [user,setUser]=useState({})

 
  useEffect(() => {
    setObject(list[list.length - 1]);
    
   //Buscamos el Usuario por  1 y convertimos su moneda
    const getUser=async()=>{
      let user=await findById(1);
      setUser(user.user);
      console.log(user.user);
      let usd= await convertir("USD",user.user.amount)
      setMonyConVertion(usd);
      
      let eth= await convertir("ETH",user.user.amount)
      setMonyConVertionEth(eth);
      
      let btc= await convertir("BTC",user.user.amount)
      setMonyConVertionBTC(btc);
      
      let usdt= await convertir("USDT",user.user.amount)
      setMonyConVertionUSDT(usdt);
    }  
    
    getUser();
  

  }, [monyConvertion]);

  const list = [
    {
      icon: usdt,
      text: "USDT",
      subText: "Wallet",
      value:monyConvertionUSDT,
      valueText: "Available",
    },
    {
      icon: eth,
      text: "ETH",
      subText: "Wallet",
      value:monyConvertionusEth,
      valueText: "Available",
    },
    {
      icon: btc,
      text: "BTC",
      subText: "Wallet",
      value:monyConvertionBTC,
      valueText: "Available",
    },
    {
      icon: usd,
      text: "USD",
      subText: "Account",
      value:monyConvertion,
      valueText: "Available",
    },
  ];
  const handleItem = (item) => {
    setObject(item);
    setVeiw(false);
    localStorage.setItem("money",item.text+" "+item.subText)
  };

  return (
    <div className={classNameMain}>
      <label className={classNameLabel}>{label}</label>
      <button onClick={() => setVeiw(veiw ? false : true)}>
        <div className={classNameContentBtn}>
          <div className={classNameDivImgText}>
            <img src={object.icon} alt="" className={classNameIcon} />
            <div>
              <h1 className={classNameText}>{object.text}</h1>
              <p className={classNameSubText}>{object.subText}</p>
            </div>
            <span className={classNameSpanOne}>{`${"\u25BC"}`}</span>
          </div>
          <div>
            <span>
              <h2 className={classNameValue}>$ {object.value}</h2>
              <p className={classNameValueText}>{object.valueText}</p>
            </span>
          </div>
        </div>
      </button>
      <div
        className={`flex flex-col absolute top-7 -left-4 bg-[#191E25] rounded-[12px] w-full h-[143.3px] z-50 px-[6px] gap-[12px] items-center ${
          veiw ? "block" : "hidden"
        } `}
      >
        {list.map((item, index) => (
          <button onClick={() => handleItem(item)}>
            <div
              className={classNameSpanList}
             
            >
              <div className="flex gap-[17px] items-center h-[24px] max-xl:text-[90%]">
                <img src={item.icon} alt="" className={classNameIconList} />
                <p className="font-bold max-2xl:text-[16px]  leading-[20.8px] max-xl:text-[90%] ">
                  {item.text}
                </p>
              </div>

              <span className="w-[73px] h-[16px] ">
                <p className="font-bold 2xl:text-[12px] leading-[15.6px] flex flex-col items-center overflow-hidden w-[100px] max-xl:text-[90%]">
                  $ {item.value}
                </p>
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
