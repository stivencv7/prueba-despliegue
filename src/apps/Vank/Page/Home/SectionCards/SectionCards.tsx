import visa from "../../../../../assets/Icon/visa.png";
import { useTranslation } from "react-i18next";
import { CardItem } from "../CardItem/CardItem";

export const SectionCards = ({ moreStyle,onclik }: { moreStyle?: string ,onclik:any}) => {
  const [t, i18n] = useTranslation("global");
  return (
    <div
      className={`${moreStyle} cards-home-responsie flex flex-col gap-[12px]  text-[16px] 2xl:h-[137px] max-2xl:gap-[8px] max-sm:gap-[12px]  max-lg:gap-[12px] max-sm:h-[137px]  max-lg:h-[137px]`}
    >
      <h2 onClick={onclik} className=" font-[700] leading-[20.8px] cursor-pointer">Cards</h2>
      <CardItem
        image={visa}
        text={t("Vank.Home.CardsInfo.myCard") + " 1"}
        amount={`$ ${"565,00"}`}
      />
      <CardItem
        image={visa}
        text={t("Vank.Home.CardsInfo.myCard") + " 2"}
        amount={`$ ${"1652.00"}`}
      />
    </div>
  );
};
