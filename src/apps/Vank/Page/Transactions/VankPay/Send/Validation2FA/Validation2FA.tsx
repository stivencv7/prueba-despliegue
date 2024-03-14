import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FooterBtn } from "../../../FooterBtn/FooterBtn";
// import { Modal } from "../../../Modal/Modal";
import codigoQR from "../../../../../../../assets/Icon/QR.png";
import CustomInputOtp from "../../../../../../Shared/CustomInputOtp/CustomInputOtp";
import InfoIcon from "../../../../../../../assets/Icon/InfoIcon";
import CustomTooltip from "../../../../../../Shared/CustomTooltip/CustomTooltip";
import { Modal } from "../../../Modal/Modal";
import { transactionAssets } from "../../../../../../service/ServiceVankPay/ServiceVanPay";
import { ToastContainer, toast } from 'react-toastify';
// import { isValid } from "zod";

const length = 6;

export const Validation2FA = ({ retur, back ,data}: { retur?: any; back?: any;data?:any }) => {
  //crea un nuevo array con una longitud especificada, lleno de cadenas vacías.
  const [otp, setOtp] = useState(new Array(length).fill(""));

  const [code, setCode] = useState("123456");

  //Globalizar texto
  const [t, i18n] = useTranslation("global");

  //estado que maneja la visibilidad de la modal
  const [modal, setModal] = useState(false);

  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);
  const [transactionId, setTransactionId] = useState("");

  const [count, setCount] = useState(0);

  /// Estado que maneja la validez de los campos del código OTP.
  const [fieldValidity, setFieldValidity] = useState(
    new Array(length).fill(true)
  );

  // Efecto que se ejecuta cuando cambia el índice de la pestaña activa.
  useEffect(() => {
    if (activeTabIndex === null) {
      return;
    }

    const setTabPosition = () => {
      const currentTab = tabsRef.current[activeTabIndex] as any;
      setTabUnderlineLeft(currentTab?.offsetLeft ?? 0);
      setTabUnderlineWidth(currentTab.clientWidth ?? 0);
    };

    setTabPosition();
  }, [activeTabIndex, i18n]);

  useEffect(() => {
    if (activeTabIndex === null) {
      return;
    }

    //
    const setTabPosition = () => {
      const currentTab = tabsRef.current[activeTabIndex] as any;
      setTabUnderlineLeft(currentTab?.offsetLeft ?? 0);
      setTabUnderlineWidth(currentTab.clientWidth ?? 0);
    };

    setTabPosition();
  }, [activeTabIndex, i18n]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCounter) => (prevCounter > 0 ? prevCounter - 1 : 0));
    }, 1000);

    if (count === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [count]);

  // Datos de las pestañas disponibles.
  let allTabs = [
    {
      id: t("Auth.login.Otp.nav.email"),
      name: t("Auth.login.Otp.nav.email"),
    },
    {
      id: t("Auth.login.Otp.nav.phone"),
      name: t("Auth.login.Otp.nav.phone"),
    },
    {
      id: t("Auth.login.Otp.nav.authy"),
      name: t("Auth.login.Otp.nav.authy"),
    },
  ];

  //Veiw modal
  // const sendOpt = () => {
  //   if (1234 == 1234) {
  //     setModal(true);
  //   }
  // };

  //Generar codigo
  const generateCode = (index?: any) => {
    if (index == 1) {
      setCode("654321");
      console.log(index);
    }
    if (index == 2) {
      setCode("321456");
    }
    if (index == 0) {
      setCode("123456");
    }
  };

  const onOtpSubmit = async() => {
    
    const isValid = otp?.every((digit) => !isNaN(digit) && digit !== "");
    
    if (!isValid) {
      const newFieldValidity = otp.map(
        (digit) => !isNaN(digit) && digit !== ""
      );
      setFieldValidity(newFieldValidity);
 

      return;
    }

    try {
      if (otp.join("") !== code) {
        throw new Error("Codigo invalido");
      }
      try{
        const response=await transactionAssets(data);
        setTransactionId(response?.body.tranId)
        setModal(true);
      }catch(error:any){
        toast.error(error?.response?.data.body)
        setModal(false);
      }
      setModal(true);
    } catch (error) {
      const newFieldValidity = new Array(length).fill(false);
      setFieldValidity(newFieldValidity);
    }
  };

  const generateSecurityCode = () => {
    // Reinicia el contador a 90 segundos
    setCount(60);
  };

  //Referencia mutable para las pestañas.
  const tabsRef = useRef([]);
  return (
    <div className="responsi-transaction-2fa flex flex-col  h-[527px] items-center justify-center max-2xl:h-full ">
      <div className="responsi-transaction-2fa-contnt1 w-full flex flex-col 2xl:gap-[27px]  max-lg:h-full max-lg:justify-between 2xl:justify-between ">
        <div className="responsi-transaction-2fa-contnt2 w-full 2xl:h-[410px] flex flex-col justify-between max-2xl:max-2xl:h-[330px] max-lg:h-[80%] ">
          <h1 className="font-bold text-[18px] xl:text-[18px]"> {t("Vank.Transaction.VankPay.Send.2FAValidation.Title")}</h1>

          <ul className="flew-row relative 2xl:h-[36px] flex items-center gap-4 w-full  max-2xl:max-2xl:h-[2.25rem]  mb-4">
            <span
              className="absolute bottom-0 top-0 flex  rounded-3xl  transition-all duration-300 "
              style={{ left: tabUnderlineLeft, width: tabUnderlineWidth }}
            >
              <span className="h-full w-full rounded-3xl bg-gray-200/30" />
            </span>
            {/*Recorremos los btn email phone auth*/}
            {allTabs.map((tab, index) => {
              const isActive = activeTabIndex === index;

              return (
                <li
                  key={index}
                  ref={(el) => ((tabsRef.current[index] as any) = el)}
                  className={`flex justify-center items-center transition-all duration-300 xl:text-[14px] max-xl:text-[14px] max-2xl:text-[16px] 2xl:text-[16px] ${
                    isActive ? `  text-white` : `text-link `
                  } cursor-pointer rounded-full h-[7px] px-[10px]  text-base `}
                  onClick={() => setActiveTabIndex(index)}
                  onMouseDown={() => generateCode(index)}
                >
                  {tab.name}
                </li>
              );
            })}
          </ul>

          {activeTabIndex != 2 ? (
            <>
              <p className=" space-y-7 mb-5 w-full sm:w-[514px]  sm:text-base text-[#EFF0F1] leading-[20.8px] max-2xl:text-[16px] max-xl:text-[14px]  2xl:text-[16px]">
                {activeTabIndex == 0 && (
                  <>
                    {t("Auth.login.Otp.thecodebesend")}{" "}
                    <span className="text-[#FAE100]">
                      {" "}
                      vank******@*****.com
                    </span>
                  </>
                )}

                {activeTabIndex == 1 && (
                  <>
                    {t("Vank.Transaction.VankPay.Send.2FAValidation.TextViaPhone")}
                    <span className="text-body font-bold ">
                      {" "}
                      SMS to +1 *** *** *465
                    </span>
                  </>
                )}
              </p>

              <p className=" mb-5 w-[514px]  sm:text-base  text-[#EFF0F1] leading-[20.8px] max-2xl:text-[16px] max-xl:text-[14px]  2xl:text-[16px]">
                {t("Auth.login.Otp.securityDigits")}
              </p>
              
              <div className="relative flex flex-col w-full  mb-3">
                { otp.join("") === code && <p className="absolute -top-8 z-50 right-3 text-[#FAE100] text-[15px] font-normal">valid ✓</p>}    
                <CustomInputOtp
                  className="mb-4 w-full"
                  length={6}
                  otp={otp}
                  setOtp={setOtp}
                  fieldValidity={fieldValidity}
                  setFieldValidity={setFieldValidity}
                />
                <div className="w-full flex justify-between items-center mb-4">
                  <div className="flex items-center justify-center gap-1">
                    <p className="text-right  text-[--text-body] text-[13px] sm:text-sm font-normal leading-[18.2px] cursor-pointer">
                    {t("Vank.Transaction.VankPay.Send.2FAValidation.DescriptionNotReciveTheCode")}?
                    </p>
                    <InfoIcon
                      id="my-anchor-element"
                      className="cursor-pointer"
                    />
                    <CustomTooltip
                      anchorSelect="#my-anchor-element"
                      place="right"
                      style={{
                        backgroundColor: "var(--dark-gray)",
                        color: "#fff",
                        padding: "10px",
                        borderRadius: "5px",
                        opacity: 1,
                        border: "2px solid #fff",
                        zIndex: 1,
                      }}
                    >
                      <div className="w-[320px] p-3">
                        <h2 className="mb-2">

                        {t("Vank.Transaction.VankPay.Send.2FAValidation.Help.TextInfo")}:
                         
                        </h2>
                        <ul className="list-disc flex flex-col items-center justify-center space-y-2">
                          <li className="list-color">

                          {t("Vank.Transaction.VankPay.Send.2FAValidation.Help.TextPoint1")}.
                          </li>
                          <li className="list-color">
                          {t("Vank.Transaction.VankPay.Send.2FAValidation.Help.TextPoint2")}.
                          </li>
                          <li className="list-color">
                          {t("Vank.Transaction.VankPay.Send.2FAValidation.Help.TextPoint3")}.
                          </li>
                          <li className="list-color">
                          {t("Vank.Transaction.VankPay.Send.2FAValidation.Help.TextPoint4")}.
                          </li>
                        </ul>
                      </div>
                    </CustomTooltip>
                    {/* <Tooltip anchorSelect="#my-anchor-element" place="right">
               
              </Tooltip> */}
                  </div>
                  {count === 0 ? (
                    <p
                      className={`text-right  text-[--yellow] text-[13px] sm:text-sm font-normal leading-[18.2px] cursor-pointer `}
                      onClick={generateSecurityCode}
                    >
                      {t("Auth.login.Otp.resendCode")}
                    </p>
                  ) : (
                    <span className="text-[13px] sm:text-sm text-white font-normal">
                      {t("Auth.login.Otp.resend")} {count}s
                    </span>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="flex justify-center gap-10 items-center h-full py-5  w-full text-[16px] ">
              <div className="w-[212px] h-[213px]">
                <img src={codigoQR} alt="" />
              </div>

              <div className="w-[275px] h-full flex flex-col justify-between pt-2">
                <p className="font-normal text-[16px] leading-[20.8px]">
                {t("Vank.Transaction.VankPay.Send.2FAValidation.Authy.TextOpenQR")}
                </p>

                <div className="h-[81px] flex flex-col justify-center items-start gap-[24px] text-[90%]">
                  <p className=" ">
                  {t("Vank.Transaction.VankPay.Send.2FAValidation.Authy.TextExpires")}
                  </p>
                  {t("Vank.Transaction.VankPay.Send.2FAValidation.Authy.TextProblemsQR")}
                </div>
              </div>
            </div>
          )}

          {/* </div> */}
        </div>
        <FooterBtn
          onClik={() => onOtpSubmit()}
          onclickBack={back}
          history={`VankPay history  \u25BA`}
          disabled={otp.join("").length!=6}
        />
      </div>
      {/**si modal es true no permite ver la venta modal*/}
      {modal && (
        <>
          <Modal
            volver={retur}
            moreStyle={`${modal ? "absolute bg-[#191E25] top-[100px] z-50 max-2xl:top-2 max-lg:top-[10%]" : ""}`}
            monto={data?.AMOUNT}
            data={data}
            transactionId={transactionId}
            
          />
          <div className="h-[100%] absolute top-0 bg-[#14181F99] w-[100%]"></div>
        </>
      )}
      <div className="absolute"><ToastContainer /></div>
    </div>
  );
};
