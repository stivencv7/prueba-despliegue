import CustomButton from "../../../../Shared/CustomButton/CustomButton";

export const FooterBtn = ({
  history,
  onClik,
  onclickBack,
  disabled,
  onClickHistory,
}: {
  history?: any;
  onClik?: any;
  onclickBack?: any;
  disabled?: any;
  onClickHistory?: any;
}) => {
  return (
    <div className="transaction-footer-btn w-full h-[87px] pt-2 flex flex-col justify-between items-end  ">
      <div className="w-full flex justify-between lg:gap-x-4">
        <CustomButton
          label={"Back"}
          onclick={onclickBack}
          className={"footer-btn bg-[#3E4347] rounded-[33px]  w-[243px] h-[36px] "}
        />
        <CustomButton
          label={"Continue"}
          onclick={onClik}
          disabled={disabled}
          className={
            `${disabled?'bg-[#D6CA5C]':'hover:bg-[#FFFF33] bg-[#FFED00]'} footer-btn  rounded-[33px] w-[243px] h-[36px] text-[#14181F]  text-[16px] font-bold leading-[20.8px] `
          }
        />
      </div>

      <CustomButton
        onclick={onClickHistory}
        label={
          <span className="text-[#9D9DA2] font-normal  text-[16px] leading-[20.8px] xl:max-2xl:text-[14px]">
            {history}
          </span>
        }
        className={"flex w-[150px]   sm:text-transparent"}
      />
    </div>
  );
};
