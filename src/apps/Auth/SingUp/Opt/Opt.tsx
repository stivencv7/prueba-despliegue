import { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";

// import CustomButton from "../../../../Shared/CustomButton/CustomButton";
// import CustomImage from "../../../../Shared/CustomImage/CustomImage";

import { useNavigate, useParams } from "react-router-dom";
import CustomButton from "../../../Shared/CustomButton/CustomButton";
import Login from "../../../../assets/Icon/Login";
import Header from "../../Header/Header";
import CustomInputOtp from "../../../Shared/CustomInputOtp/CustomInputOtp";
import CustomTooltip from "../../../Shared/CustomTooltip/CustomTooltip";
import InfoIcon from "../../../../assets/Icon/InfoIcon";
import { motion } from "framer-motion";

const length = 6;

const Opt = ({ email }: { handleBackRegister?: any; email?: any }) => {
  const [t, i18n] = useTranslation("global");
  const navigate = useNavigate();

  const { modo } = useParams();

  const [otp, setOtp] = useState(new Array(length).fill(""));

  const [isModalInfo, setIsModalInfo] = useState<Boolean>(false);

  const [fieldValidity, setFieldValidity] = useState(
    new Array(length).fill(true)
  );

  const [count, setCount] = useState(0);

  // useEffect(() => {
  //   // currentPage === 1
  //   if (currentPage === 1) {
  //     setOtp(new Array(length).fill(""));
  //     setFieldValidity(new Array(length).fill(true));
  //   }
  // }, [currentPage]);

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
    const _isValid = otp?.every((digit) => !isNaN(digit) && digit !== "");
    if (!_isValid) {
      const newFieldValidity = otp.map(
        (digit) => !isNaN(digit) && digit !== ""
      );
      setFieldValidity(newFieldValidity);
      return;
    }

    try {
      // nextPage();

      const param =
        modo === "Company" ? "MultiStepFormCompany" : "MultiStepFormPerson";
      navigate(`/Auth/${param}`);
      if (otp.join("") !== "23232") {
        throw new Error("Codigo invalido");
      }
    } catch (error) {
      const newFieldValidity = new Array(length).fill(false);
      setFieldValidity(newFieldValidity);
    }
  };

  const generateSecurityCode = () => {
    setCount(30);
  };

  const _isValid = otp?.every((digit) => !isNaN(digit) && digit !== "");

  return (
    <div className="w-full h-full absolute flex flex-col justify-center items-center transition-transform duration-300 dark:bg-[--background-dark-blue] ">
      {/* Header */}
      <Header />

      {/* modal de verificacion */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 0.9 }}
        transition={{
          duration: 0.2,
          delay: 0.1,
          ease: [0, 0.71, 0.2, 0.2],
        }}
        className="w-full sm:w-auto px-[22px] py-[36px] sm:p-[36px] rounded-[32px] shadow-lg bg-[--background-soft-blue]"
      >
        <div className="relative h-[146px] ">
          <p
            className="mb-4 text-base font-normal leading-[20.8px] text-[--text-body] cursor-pointer opacity-[0.6]"
            onClick={() => navigate("/Auth")}
          >
            {t("Auth.register.opt.back")}
          </p>
          <h2 className="text-[--text-body] text-sm sm:text-base leading-[22.1px] font-bold mb-2">
            {t("Auth.register.opt.emailVerification")}
          </h2>
          <p className="space-y-7 mb-5 w-full sm:w-[514px] text-sm sm:text-base font-normal text-[--text-body] leading-[20.8px]">
            {t("Auth.register.opt.InfoCode.info")}{" "}
            <span className="font-bold">{email}</span>,{" "}
            {t("Auth.register.opt.InfoCode.code")}
          </p>
          {/* <Lock2 className="absolute right-1 top-1 w-[29.81px] h-[39px]" /> */}
        </div>
        <div className="flex flex-col w-full overflow-hidden">
          <CustomInputOtp
            className="mb-4"
            length={6}
            otp={otp}
            setOtp={setOtp}
            fieldValidity={fieldValidity}
            setFieldValidity={setFieldValidity}
          />
          <div className="w-full flex justify-between items-center mb-4">
            <div className="flex items-center justify-center gap-1">
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
                      Use keywords like "verification" or "login" for efficient
                      searching.
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
                className={`text-right  text-[--text-body] text-[13px] sm:text-sm font-normal leading-[18.2px] cursor-pointer `}
                onClick={generateSecurityCode}
              >
                {t("Auth.login.Otp.resendCode")}
              </p>
            ) : (
              <span className="text-[13px] sm:text-sm text-[--text-body] font-normal">
                {t("Auth.login.Otp.resend")} {count}s
              </span>
            )}
          </div>
          <div className="w-full flex  justify-center items-center">
            <CustomButton
              className="group flex justify-center items-center relative bg-[--yellow] disabled:bg-[--yellow-disabled] w-full h-[42px] rounded-[60px] text-base font-bold leading-[20.8px] text-[--background-dark-blue] px-[12px]"
              onclick={onOtpSubmit}
              disabled={!_isValid}
            >
              <span className="w-[114px]">
                {t("Auth.register.buttonContinue")}
              </span>
              <Login className="w-[28px]" />
            </CustomButton>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Opt;
