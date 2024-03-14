import eth from "../../../../../assets/Icon/eth.jpeg";
import usdt from "../../../../../assets/Icon/usdt.jpeg";
import btc from "../../../../../assets/Icon/Bitcoin.jpeg";
import { useTranslation } from "react-i18next";
import { CardItem } from "../CardItem/CardItem";

export const SectionCryto = ({ moreStyle,onclick }: { moreStyle?: string,onclick?:any }) => {
  const [t, i18n] = useTranslation("global");
  return (
    <div
      className={`cards-home-responsie-cryto  flex flex-col gap-[12px]  h-[195px]  max-2xl:h-[171px] w-full  max-2xl:gap-[8px]  overflow-hidden max-sm:gap-[12px]  max-lg:gap-[12px] max-sm:h-[195px]   max-lg:h-[195px] ${moreStyle}`}
    >
      <h2 className="font-[700] leading-[20.8px] cursor-pointer" onClick={onclick}>Crypto</h2>
      <CardItem
        image={usdt}
        text={"USDT"}
        subtext={t("Vank.Home.CryptoInfo.tether")}
        amount={`${"16.60000"}`}
      />
      <CardItem
        image={eth}
        text={`ETH`}
        subtext={"Ethereum"}
        amount={`${"3.340000"}`}
      />
      <CardItem
        image={btc}
        text={"BTC"}
        subtext={"Bitcoin"}
        amount={`${"4.550000"}`}
      />
    </div>
  );
};
