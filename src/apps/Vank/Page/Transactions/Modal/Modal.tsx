import { useEffect, useState } from "react";
import "./style.css";
import tick from "../../../../../assets/Icon/Tick 2.png";
import CustomButton from "../../../../Shared/CustomButton/CustomButton";
import { useNavigate} from "react-router-dom";
import { useTranslation } from "react-i18next";
export const Modal = ({
  moreStyle,
  title,
  monto,
  volver,
  data,
  transactionId,
}: {
  moreStyle?: any;
  title?: any;
  volver?: any;
  monto?: any,
  data?: any,
  transactionId?:any
}) => {

  const [t, i18n] = useTranslation("global");
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState(1);
  const [typeMoney, setMoney] = useState("");
  const [currentDateTime, setCurrentDateTime] = useState("");

  const nagavite=useNavigate();

  
  useEffect(() => {


    setMoney(localStorage.getItem("money") as string);
    setTimeout(() => {
      setLoading(true);
    }, 1000);

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    const formattedTime = currentDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    setCurrentDateTime(`${formattedDate} - ${formattedTime} Hrs`);
  }, []);

  return (
    <div
      className={` w-[502px] h-[514px] p-[36px] rounded-[32px] gap-[16px] bg-[#191E25]  max-2xl:h-[100%] ${moreStyle} max-2xl:h-[490px] max-lg:h-[70%]`}
    >

      <div className={`${view == 1 ? 'w-[430px] h-[442px] flex flex-col items-center justify-between' : 'h-20px'}`}>
        {view == 1 ?
          <>
            <div className={`w-[121px] h-[121px] relative flex flex-col justify-center items-center`}>
              {!loading ? (
                <span className="double-circle">
                  <span className="double-circle2"></span>
                </span>
              ) : (
                <img src={tick} alt="" />
              )}  
              {/* typeMoney.split(" ")[0] */}
            </div>
            <div className="w-[430px] h-[51px] flex flex-col gap-[6px] justify-center items-center">
              {loading && (
                <div className="w-[430px] h-[51px] flex flex-col gap-[6px] justify-center items-center">
                  <h1 className="text-[20px] leading-[26px] font-bold">{`${typeMoney.split(" ")[0]=="USD"?'$':''}`} {monto} {`${typeMoney.split(" ")[0]}`}</h1>
                  <p className="text-[#EFF0F1] font-normal text-[16px] leading-[20.8px]">
                  {t("Vank.Transaction.VankPay.Send.Modal.SentSuccesFully.SentSuccesFully")}
                    
                  </p>
                </div>
              )}

              {!loading && <h1>{t("Vank.Transaction.VankPay.Send.Modal.LoadingSend.LoadingSend")}.</h1>}
            </div>

            <div className="text-center">
              {loading && (
                <p className="transition-height duration-1000">
                  {t("Vank.Transaction.VankPay.Send.Modal.SentSuccesFully.DescriptionSentSuccesFully")}
                 
                </p>
              )}
              {!loading && (
                <p>
                 {t("Vank.Transaction.VankPay.Send.Modal.LoadingSend.LoadingDescription")}
                </p>
              )}
            </div>
          </>
          :
          <div className="">
            <h1>VankPay Sending Resume</h1>
            <div className="responsi-transaction-resume-content2 h-[298px] flex flex-col gap-4 mt-10 w-[100%] text-[16px]   xl:max-2xl:text-sm xl:max-2xl:h-[70%] ">

              <div className="flex w-[100%] justify-between h-[21px] text-[#FEDD00]">
                <p>Transaction ID:</p>
                <p className="leading-[20.8px]">
                  {transactionId}
                </p>
              </div>

              <div className="flex w-[100%] justify-between h-[21px]">
                <p>Date:</p>
                <p className="leading-[20.8px]">
                  {currentDateTime}
                </p>
              </div>

              <div className="flex w-[100%] justify-between h-[21px]">
                <p>Amount Sent:</p>
                <p className="leading-[20.8px] font-bold">
                  {data?.AMOUNT} {data?.ASSET}
                </p>
              </div>

              <div className="flex  justify-between h-[21px]  w-[100%]">
                <p>Sent from:</p>
                <p>{typeMoney}</p>
              </div>
              <div className="flex justify-between h-[21px]  w-[100%]">
                <p>Vank ID:</p>
                <p>V9*********</p>
              </div>
              <div className="flex  justify-between h-[21px]  w-[100%]">
                <p>Phone Number:</p>
                <p>{3018843900}</p>
              </div>
              
              <div className="flex  justify-between h-[21px]  w-[100%]">
                <p>Beneficiary Email: </p>
                <p>{data?.TO_EMAIL}</p>
              </div>

              <div className="responsi-transaction-resume-border h-[6px]  pb-[10px] border-b-[1px] border-[#5E6061] "></div>
            </div>
          </div>
        }


        {loading && (
          <div className="flex flex-col gap-4 items-center transition duration-1000">
            <CustomButton
              label={"Finish Transaction"}
              onclick={volver}
              className="flex flex-col justify-center items-center bg-[#FFED00] w-[406px] h-[36px] rounded-[60px] px-[12px] text-[#14181F] font-bold text-[16px] hover:bg-[#FFFF33] "
            />
            <CustomButton
              label={view == 1 ? "View Transaction" : "Download Resume"}
              onclick={() => setView(2)}
              className={
                "border-b-[1px] border-[#6B6B6E] w-[150px] text-[#EFF0F1] font-normal leading-[28.8px]"
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};
