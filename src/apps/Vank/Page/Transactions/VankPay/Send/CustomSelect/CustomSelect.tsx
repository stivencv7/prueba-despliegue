import { useEffect, useState } from "react";
import usd from "../../../../../../../assets/Icon/USD.png";
import eth from "../../../../../../../assets/Icon/eth.jpeg";
import btc from "../../../../../../../assets/Icon/Bitcoin.jpeg";
import usdt from "../../../../../../../assets/Icon/usdt.jpeg";
import trx from "../../../../../../../assets/Icon/TRX (2).png";

// import {
//   convertir,
//   findById,
// } from "../../../../../../service/ServiceTransaction/ServiceTransaction";
import { assetsList } from "../../../../../../service/ServiceVankPay/ServiceVanPay";

export const CustomSelect = ({ label, data }: { label?: any; data?: any }) => {
  const [object, setObject] = useState({
    icon: "",
    text: "",
    subText: "",
    value: 0,
    valueText: "",
  });

  const [veiw, setVeiw] = useState<boolean>();
  //estado de mondeda USD
  const [monyConvertion, setMonyConVertion] = useState();
  //estado de mondeda Eth
  const [monyConvertionusEth, setMonyConVertionEth] = useState();
  //estado de mondeda BTC
  const [monyConvertionBTC, setMonyConVertionBTC] = useState();
  //estado de mondeda USDT
  const [monyConvertionUSDT, setMonyConVertionUSDT] = useState();
  //estado de user
  const [user, setUser] = useState({});
  // const [assets, setAssets] = useState([]);

  const [assets, setAssets] = useState([] as any[]);
  const [assetList, setAssetsList] = useState([]);
  const [amountAvailable, setAmountAvailable] = useState(0);


  useEffect(() => {
    setObject(list[list.length - 1]);
    const handleAssets = async () => {
      setAssets(list);
    }
    handleAssets();

  }, [monyConvertion]);

  //lista queda de activos
  const list: any = [
    {
      icon: usdt,
      text: "USDT",
      subText: "Wallet",
      value: monyConvertionUSDT,
      valueText: "Available",
    },
    {
      icon: eth,
      text: "ETH",
      subText: "Wallet",
      value: monyConvertionusEth,
      valueText: "Available",
    },
    {
      icon: btc,
      text: "BTC",
      subText: "Wallet",
      value: monyConvertionBTC,
      valueText: "Available",
    },
    {
      icon: trx,
      text: "TRX",
      subText: "Wallet",
      value: monyConvertion,
      valueText: "Available",
    },
    {
      icon: usd,
      text: "USD",
      subText: "Account",
      value: monyConvertion,
      valueText: "Available",
    },
   

  ];

  //Se realiza una peticion al servidor el cual nos regresa una lista de Assets
  useEffect(()=>{

    localStorage.setItem("money", list[list.length-1].text + " " + list[list.length-1].subText);

    const getListAssets=async()=>{
      const body = await assetsList();
      console.log("boDy "+body?.body);
      
      setAssetsList(body?.body)
    }
    getListAssets();
    
  },[])


  //Se realiza unfiltro por el nombre de activo
  const filtrarPorAsset=(asset:any)=> {
    return assetList.filter((item:any) => item?.asset === asset);
  }

  //funcion que realiza un llamdo al filtraporAssets el cual nos de vuelve un free  
  const handleItem = (item?: any) => {

    const resultado:any= filtrarPorAsset(item?.text);
    
    setAmountAvailable(resultado[0]?.free);
   

    localStorage.setItem("assets",item?.text)
  
    setObject(item);
    setVeiw(false);
    localStorage.setItem("money", item.text + " " + item.subText);
  };

  return (
    <div
      className={
        "flex flex-col w-[275px] relative gap-[8px] h-[65px] pr-[32px] "
      }
    >
      <label
        className={
          "transaction-send font-normal text-[16px] leading-[20.8px] xl:max-2xl:text-sm"
        }
      >
        {label}
      </label>
      <button onClick={() => setVeiw(veiw ? false : true)} className="">
        <div className={"w-[237px] h-[36px] flex justify-between  px-[0px] xl:max-2xl:justify-start xl:max-2xl:gap-10"}>
          <div className={"flex gap-[16px] w-[128px] h-[38px] "}>
            <img
              src={object.icon}
              alt=""
              className={"w-[36px] h-[36px] rounded-[100%] xl:max-2xl:w-[30px] xl:max-2xl:h-[30px]"}
            />
            <div>
              <h1
                className={
                  "transaction-send text-[20px] font-bold leading-[26px] xl:max-2xl:text-sm"
                }
              >
                {object.text}
              </h1>
              <p className={"text-[0.75rem] font-normal leading-[15.6px] xl:max-2xl:text-[10px]"}>
                {object.subText}
              </p>
            </div>
            <span className={"text-[0.75rem]"}>{`${"\u25BC"}`}</span>
          </div>
          <div>
            <span>
              <h2
                className={
                  "transaction-send text-[16px] font-bold leading-[20.8px] xl:max-2xl:text-sm"
                }
              >
                $ {amountAvailable}
              </h2>
              <p
                className={
                  "select-send-avalible text-[12px] font-normal leading-[15.6px] relative top-1 text-end xl:max-2xl:top-0 xl:max-2xl:text-[10px]"
                }
              >
                {object.valueText}
              </p>
            </span>
          </div>
        </div>
      </button>
      <div
        className={`flex flex-col absolute -left-4 top-6 bg-[#191E25] pb-2 rounded-[12px] w-full h-auto z-50 px-[6px] gap-[12px] items-center ${veiw ? "block" : "hidden"
          } `}
      >
        {assets.map((item) => (
          <button onClick={() => handleItem(item)}>
            <div
              className={
                "w-[199px] h-[24px] flex justify-between items-center "
              }
            >
              <div className="flex gap-[17px] items-center h-[24px] max-xl:text-[90%] ">
                <img
                  src={item?.icon}
                  alt=""
                  className={"w-[36px] h-[36px] rounded-[100%] max-2xl:h-[26px] max-2xl:w-[26px] 2xl:w-[26px] 2xl:h-[26px]"}
                />
                <p className="font-bold max-2xl:text-[16px]  leading-[20.8px] max-xl:text-[90%] ">
                  {item?.text}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
