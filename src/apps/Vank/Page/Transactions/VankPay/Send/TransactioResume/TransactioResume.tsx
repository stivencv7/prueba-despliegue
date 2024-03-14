import { useEffect, useState } from "react";
import { FooterBtn } from "../../../FooterBtn/FooterBtn";
import "./style.css";
import { Validation2FA } from "../Validation2FA/Validation2FA";
import { Controller, useForm } from "react-hook-form";
import Check2 from "../../../../../../../assets/Icon/Check2";
import { useTranslation } from "react-i18next";
export const TransactioResume = ({
  dataUser,
  retur,
  back,
  amount,
  beneficiary
}: {
  dataUser?: any;
  retur?: any;
  back?: any;
  amount?: any;
  beneficiary?: any;
}) => {
  const [data, seData] = useState({} as any);

  const [continu, setContinue] = useState(1);
  const [typeMoney, setMoney] = useState("");
  const [termsConditions, settermsConditions] = useState(false);
  const [textMoney, setTextmoney] = useState("");
  const [t, i18n] = useTranslation("global");

  const {
    // handleSubmit,
    // watch,
    control,
    // formState: { errors, isValid },
    // setValue,
    getValues,
    // clearErrors,
  } = useForm({
    // resolver: zodResolver(_schema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      terms: "",
    },
  });

  useEffect(() => {
    seData(dataUser);
    setMoney(localStorage.getItem("money") as string);

    const moneyFromLocalStorage = localStorage.getItem("money");
    
    if (moneyFromLocalStorage !== null) {
      const textMoney = moneyFromLocalStorage.split(" ")[0];
      setTextmoney(textMoney)
    } else {
      // Si el valor en localStorage es null, manejarlo de alguna manera
    }

    
  }, []);

  return (
    <div className="responsi-transaction-resume-main  2xl:w-full  2xl:h-[527px] flex flex-col gap-[32px] bg-red-400">
      {continu == 1 && (
        <div className="responsi-transaction-resume-main2 flex flex-col h-full gap-y-[12px] 2xl:gap-[22.74px]  max-lg:justify-between 2xl:justify-between ">

          <h1 className="responsive-text text-[#EFF0F1] font-bold  leading-[20.8px]  xl:max-2xl:text-sm ">
            Transaction Resume
          </h1>
          <div className="responsi-transaction-resume-content1 w-full h-[355px]  flex flex-col gap-[33px]  xl:max-2xl:gap-[20px] xl:max-2xl:h-full max-lg:h-[70%] bg ">

            <div className="responsi-transaction-resume-content2 h-[264px] flex flex-col justify-between w-[100%] text-[16px]   xl:max-2xl:text-sm xl:max-2xl:h-[70%] ">
              <div className="flex w-[100%] justify-between h-[21px]">
                <p>{t("Vank.Transaction.VankPay.Send.Amount")} :</p>
                <p className="text-[#FFED00]  leading-[20.8px] font-bold">
                  $ {data?.AMOUNT} {data?.ASSET}
                </p>
              </div>
              <div className="flex  justify-between h-[21px]  w-[100%]">
                <p>{t("Vank.Transaction.VankPay.Send.Resume.BeneficiaryName")}:</p>
                <p>{beneficiary}</p>
              </div>
              <div className="flex  justify-between h-[21px]  w-[100%]">
                <p>{t("Vank.Transaction.VankPay.Send.Resume.SendingFrom")}:</p>
                <p>{typeMoney}</p>
              </div>
              <div className="flex justify-between h-[21px]  w-[100%]">
                <p>{t("Vank.Transaction.VankPay.Send.Resume.VankID")}:</p>
                <p>{999999}</p>
              </div>
              <div className="flex  justify-between h-[21px]  w-[100%]">
                <p>{t("Vank.Transaction.VankPay.Send.Resume.PhoneNumber")}:</p>
                <p>{3018843900}</p>
              </div>
              <div className="flex  justify-between h-[21px]  w-[100%]">
                <p>{t("Vank.Transaction.VankPay.Send.Resume.BeneficiaryEmail")}: </p>
                <p>{data?.TO_EMAIL}</p>
              </div>

              <div className="responsi-transaction-resume-border h-[36px] pt-[24px] pb-[10px] border-b-[2px] border-[#3E4347] "></div>
            </div>

            <div className="flex items-center gap-x-5 transition-transform duration-500 w-full h-[42px]  mb-6">
              <div className="flex items-center relative cursor-pointer">
                <Controller
                  render={({ field: { onChange, value, name } }) => (
                    <div className="flex items-center relative cursor-pointer">
                      <input
                        type="checkbox"
                        onClick={() => settermsConditions(termsConditions ? false : true)}
                        name={name}
                        value={value}
                        checked={termsConditions}
                        className={`appearance-none w-[22px] h-[22px] rounded-[4px] relative bg-[--dark-gray] cursor-pointer z-20 ${getValues("terms") && "opacity-10"
                          }`}
                        onChange={onChange}
                      />
                      {getValues("terms") && (
                        <div className="absolute w-full h-full flex justify-center items-center bg-[--dark-gray] rounded-[4px]">
                          <Check2 className="text-[--yellow] w-[15px] h-[10px]" />
                        </div>
                      )}
                    </div>
                  )}
                  name="terms"
                  control={control}
                />
              </div>
              <p className="responsive-text text-[16px] font-normal leading-[20.8px] xl:text-[15px]">
                {t("Vank.Transaction.VankPay.Send.Resume.TermsAndConditions.textByClicking")}{" "}
                <span className=" font-bold">{t("Vank.Transaction.VankPay.Send.Resume.TermsAndConditions.TextContinue")}</span>,{" "}{t("Vank.Transaction.VankPay.Send.Resume.TermsAndConditions.TextIAgree")}{" "}
                <span className=" font-bold">{t("Vank.Transaction.VankPay.Send.Resume.TermsAndConditions.TextTerms")}</span>{" "} {t("Vank.Transaction.VankPay.Send.Resume.TermsAndConditions.And")}{" "}
                <span className="font-bold">{t("Vank.Transaction.VankPay.Send.Resume.TermsAndConditions.Conditions")}.</span>{" "}
              </p>
            </div>
          </div>

          <FooterBtn
            history={`VankPay history  \u25BA`}
            onClik={() => setContinue(continu + 1)}
            onclickBack={back}
            disabled={!termsConditions}
          />
        </div>
      )}

      {continu == 2 && (
        <Validation2FA data={dataUser} retur={retur} back={() => setContinue(1)} />
      )}
    </div>
  );
};
