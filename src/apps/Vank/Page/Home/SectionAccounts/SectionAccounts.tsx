import { CardItem } from "../CardItem/CardItem";
import usd from "../../../../../assets/Icon/USD.png";
import savings from "../../../../../assets/Icon/USDSavings.png";
import { useTranslation } from "react-i18next";

export const SectionAccounts = ({ moreStyle,onclik }: { moreStyle?: string,onclik:any }) => {
  const [t, i18n] = useTranslation("global");
  return (
    <div
      className={`cards-home-responsie flex flex-col 2xl:gap-[12px] 2xl:h-[137px]  max-2xl:gap-[8px] max-sm:gap-[12px]  max-lg:gap-[12px] max-sm:h-[137px]  max-lg:h-[137px] ${moreStyle}`}
    >
      <h2 onClick={onclik} className="  font-[700] cursor-pointer">Accounts</h2>
      <CardItem image={usd} text={"USD"} amount={`$ ${"4.565,00"}`} />
      <CardItem
        image={savings}
        text={t("Vank.Home.AccountInfo.usdSavings")}
        amount={`$ ${"860,00"}`}
      />
    </div>
  );
};
