import React, { useEffect, useRef, useState } from "react";
// import HeaderAuth from "../../HeaderAuth/HeaderAuth";
// import FooterAuth from "../../FooterAuth/FooterAuth";
// import CustomButton from "../../../../Shared/CustomButton/CustomButton";
// import CustomImage from "../../../../Shared/CustomImage/CustomImage";
import { useTranslation } from "react-i18next";

import Header from "../../Header/Header";
import Lock2 from "../../../../assets/Icon/Lock2";
import CustomButton from "../../../Shared/CustomButton/CustomButton";
import Login from "../../../../assets/Icon/Login";
import CustomInputOtp from "../../../Shared/CustomInputOtp/CustomInputOtp";
import CustomTooltip from "../../../Shared/CustomTooltip/CustomTooltip";
import InfoIcon from "../../../../assets/Icon/InfoIcon";
import QR from "../../../../assets/Icon/QR.png";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const length = 6;

const Otp = ({ email }: { email?: string }) => {
  const [t, i18n] = useTranslation("global");

  const navigate = useNavigate();

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

  const [otp, setOtp] = useState(new Array(length).fill(""));

  const [fieldValidity, setFieldValidity] = useState(
    new Array(length).fill(true)
  );

  const tabsRef = useRef<any>([]);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);

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

  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCounter) => (prevCounter > 0 ? prevCounter - 1 : 0));
    }, 1000);

    if (count === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [count]);

  useEffect(() => {
    // if (currentViewRegister === 2) {
    setCount(30);
    // }
  }, []);

  const onOtpSubmit = () => {
    // Validar el código OTP (aquí puedes agregar tus propias condiciones)
    const isValid = otp?.every((digit) => !isNaN(digit) && digit !== "");
    navigate("/");
    if (!isValid) {
      const newFieldValidity = otp.map(
        (digit) => !isNaN(digit) && digit !== ""
      );
      setFieldValidity(newFieldValidity);
      return;
    }

    try {
      if (otp.join("") !== "23232") {
        throw new Error("Codigo invalido");
      }
    } catch (error) {
      const newFieldValidity = new Array(length).fill(false);
      setFieldValidity(newFieldValidity);
    }
  };

  const generateSecurityCode = () => {
    // Reinicia el contador a 90 segundos
    setCount(60);
  };

  const isValid = otp?.every((digit) => !isNaN(digit) && digit !== "");

  return (
    <div className="w-full h-full absolute flex flex-col justify-center items-center transition-transform duration-300 dark:bg-[--background-dark-blue]">
      <Header />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.2,
          delay: 0.1,
          ease: [0, 0.71, 0.2, 0.2],
        }}
        className={`w-full sm:max-w-[677px] py-[30px] px-[35px]  rounded-[32px] shadow-lg bg-[--background-soft-blue] scale-95`}
      >
        <div className="relative ">
          <p
            className="mb-3 text-base font-normal leading-[20.8px] text-[--text-body] cursor-pointer opacity-[0.6]"
            onClick={() => navigate("/Auth")}
          >
            {t("Auth.register.opt.back")}
          </p>
          <h2 className="text-[--text-body] text-base leading-[22.1px] font-bold mb-[28px]">
            {t("Auth.login.Otp.title")}
          </h2>

          <ul className="flew-row relative  h-[36px] flex items-center ">
            <div
              className="absolute bottom-0 top-0 flex  rounded-3xl  transition-all duration-300 bg-gray-200/30"
              style={{ left: tabUnderlineLeft, width: tabUnderlineWidth }}
            />

            {allTabs.map((tab, index) => {
              const isActive = activeTabIndex === index;

              return (
                <li
                  key={index}
                  ref={(el) => (tabsRef.current[index] = el)}
                  className={`flex justify-center items-center transition-all duration-300  ${
                    isActive ? `` : `text-[#6B6B6E] `
                  } cursor-pointer rounded-full h-[7px] px-[21px] font-normal text-[--text-body] text-base`}
                  onClick={() => setActiveTabIndex(index)}
                >
                  {tab.name}
                </li>
              );
            })}
          </ul>

          {(allTabs[activeTabIndex].name === "Email" ||
            allTabs[activeTabIndex].name === "correo electrónico") && (
            <p className="mt-[20px] space-y-7 mb-4 w-full sm:w-[514px] text-sm sm:text-base text-[--text-body] leading-[20.8px]">
              {t("Auth.login.Otp.thecodebesend")}{" "}
              <span className="text-[#FAE100] font-bold">
                {" "}
                vank******@*****.com
              </span>
            </p>
          )}

          {(allTabs[activeTabIndex].name === "Phone number" ||
            allTabs[activeTabIndex].name === "Número de teléfono") && (
            <p className="mt-[20px] space-y-7 mb-4 w-full sm:w-[514px] text-sm sm:text-base text-[--text-body] leading-[20.8px]">
              The code will be sent via SMS to{" "}
              <span className="text-[#FAE100] font-bold">+1 *** *** *465</span>
            </p>
          )}

          {allTabs[activeTabIndex].name !== "Authy" && (
            <p className="mb-7 w-[514px] text-sm sm:text-base font-normal text-[--text-body] leading-[20.8px]">
              {t("Auth.login.Otp.securityDigits")}
            </p>
          )}
          {/* <Lock2 className="absolute right-[3px] sm:top-16 -top-2 w-[41px] h-[54px] " /> */}
        </div>
        {allTabs[activeTabIndex].name !== "Authy" && (
          <div className="flex flex-col w-full overflow-hidden mb-3">
            <CustomInputOtp
              className="mb-4"
              length={6}
              otp={otp}
              setOtp={setOtp}
              fieldValidity={fieldValidity}
              setFieldValidity={setFieldValidity}
            />
            <div className="w-full flex justify-between items-center mb-4">
              <div className="flex items-center justify-center gap-2">
                <p className="text-right  text-[--text-body] text-[13px] sm:text-sm font-normal leading-[18.2px] cursor-pointer">
                  Did not Recieve the Code?
                </p>
                <InfoIcon id="my-anchor-element" className="cursor-pointer" />
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
                      When searching for the login verification email in your
                      mailbox:
                    </h2>
                    <ul className="list-disc flex flex-col items-center justify-center space-y-2">
                      <li className="list-color">
                        Use keywords like "verification" or "login" for
                        efficient searching.
                      </li>
                      <li className="list-color">
                        Check your spam or junk folder to ensure it's not
                        misclassified.
                      </li>
                      <li className="list-color">
                        Sort emails by date to quickly locate the latest
                        verification email.
                      </li>
                      <li className="list-color">
                        Check all folders, including inbox and custom folders.
                      </li>
                    </ul>
                  </div>
                </CustomTooltip>
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
        )}
        {allTabs[activeTabIndex].name === "Authy" && (
          <div className="flex justify-between mt-[20px] mb-5">
            <div className="w-[207px] h-[209px]">
              <img src={QR} alt="" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col justify-between pl-11">
              <p className="text-base text-[--text-body]">
                Open your <span className="font-bold">Authy Ap</span>p and scan
                the <span>QR</span> code
              </p>
              <div className="space-y-5">
                <p className="text-base text-[--text-body]">
                  Code expires in <span className="font-bold">5:00 min</span>
                </p>
                <p className="text-base text-[--text-body]">
                  Open your Authy App and scan the QR code
                </p>
              </div>
            </div>
          </div>
        )}
        {/* {allTabs[activeTabIndex].name !== "Authy" && ( */}
        <div className="w-full flex  justify-center items-center">
          <CustomButton
            className="group flex justify-center items-center relative bg-[#FAE100] disabled:bg-[--yellow-disabled] w-full h-[42px] rounded-[60px] text-base font-bold leading-[20.8px] text-[#000000] px-[12px]"
            onclick={onOtpSubmit}
            disabled={allTabs[activeTabIndex].name !== "Authy" && !isValid}
          >
            <span className="w-[114px]">{t("Auth.login.Otp.OtpButton")}</span>
            <Login className="w-[26px] sm:w-[28px]" />
          </CustomButton>
        </div>
        {/* )} */}
      </motion.div>
    </div>
  );
};

export default Otp;
