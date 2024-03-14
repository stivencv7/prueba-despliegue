import React, { useEffect, useRef, useState } from "react";
import CustomButton from "../../../Shared/CustomButton/CustomButton";
import Login from "../../../../assets/Icon/Login";
import Header from "../../Header/Header";
// import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import InfoIcon from "../../../../assets/Icon/InfoIcon";
import { Tooltip } from "react-tooltip";
import "./PassResetVerifier.css";
import CustomTooltip from "../../../Shared/CustomTooltip/CustomTooltip";
import LoadingGif from "../../../../assets/Icon/loading-yellow.gif";
import CustomInputOtp from "../../../Shared/CustomInputOtp/CustomInputOtp";
import { motion } from "framer-motion";

const length = 6;

const PassResetVerifier = () => {
  const [t, i18n] = useTranslation("global");

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [otp, setOtp] = useState(new Array(length).fill(""));
  const [count, setCount] = useState(60);

  const inputRefs = useRef<any>([]);

  const [fieldValidity, setFieldValidity] = useState(
    new Array(length).fill(true)
  );

  //   const {
  //     handleSubmit,
  //     watch,
  //     control,
  //     formState: { errors, isValid },
  //     setValue,
  //     getValues,
  //     clearErrors,
  //   } = useForm({
  //     // resolver: zodResolver(_schema),
  //     mode: "onChange",
  //     reValidateMode: "onChange",
  //     defaultValues: {
  //       email: "",
  //     },
  //   });

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCounter) => (prevCounter > 0 ? prevCounter - 1 : 0));
    }, 1000);

    if (count === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [count]);

  const handleChange = (index?: any, e?: any) => {
    const value = e.target.value;
    if (isNaN(value)) return false;
    const newOtp = [...otp];

    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // submit trigger
    // const combineOtp = newOtp.join("");
    // if (combineOtp.length === length) onOtpSubmit(combineOtp);

    if (value && index < length - 1 && inputRefs?.current[index + 1]) {
      inputRefs?.current[index + 1].focus();
    }
    const newFieldValidity = [...fieldValidity];
    newFieldValidity[index] = true;
    setFieldValidity(newFieldValidity);
  };

  const handleClick = (index?: any) => {
    inputRefs.current[index].setSelectionRange(1, 1);
    const newFieldValidity = new Array(length).fill(true);
    setFieldValidity(newFieldValidity);
    // optional
    if (index > 0 && !otp[index - 1]) {
      inputRefs.current[otp.indexOf("")].focus();
    }
  };

  const handleKeyDown = (index?: any, e?: any) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      inputRefs.current[index - 1].focus();
    }
  };

  const generateSecurityCode = () => {
    // Reinicia el contador a 90 segundos
    setCount(60);
  };

  const onSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/Auth/forgot-password-reset");
    }, 1000);
  };

  const isValid = otp?.every((digit) => !isNaN(digit) && digit !== "");

  return (
    <div className="w-full h-full absolute flex flex-col justify-center items-center transition-transform duration-300 dark:bg-[--background-dark-blue]">
      <Header />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 0.9 }}
        transition={{
          duration: 0.2,
          delay: 0.1,
          ease: [0, 0.71, 0.2, 0.2],
        }}
        className="w-full sm:w-auto rounded-[32px] shadow-lg bg-[--background-soft-blue] relative overflow-hidden"
      >
        <div className="px-[22px] py-[36px] sm:p-[36px]">
          <p
            className="mb-5 text-base font-normal leading-[20.8px] text-[--text-body] cursor-pointer opacity-[0.6]"
            onClick={() => navigate("/Auth/ForgotPassword")}
          >
            {t("Auth.register.opt.back")}
          </p>
          <h2 className="text-[--text-body] text-base leading-[22.1px] font-bold mb-3">
            Verify your Email
          </h2>
          <p className="mb-4 w-full sm:w-[600px] text-sm sm:text-base font-normal text-[--text-body] leading-[20.8px]">
            The <span className="text-[--yellow]">activation/ recovery</span>{" "}
            code of your account was{" "}
            <span className="text-[--yellow]">sent</span> to your{" "}
            <span className="text-[--yellow]">email</span> address
          </p>

          <div className=" flex flex-col overflow-hidden">
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
                {/* <Tooltip anchorSelect="#my-anchor-element" place="right">
               
              </Tooltip> */}
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
          </div>

          <CustomButton
            className={`w-full h-[42px] transition-all duration-200 flex justify-center items-center gap-x-2 bg-[--yellow] disabled:bg-[--yellow-disabled] rounded-[60px] px-[12px] text-lg font-bold  text-[--background-dark-blue] mb-4 relative overflow-hidden`}
            onclick={onSubmit}
            disabled={!isValid}
          >
            <div
              className={`flex absolute w-full justify-center items-center transition-all duration-500 `}
            >
              <span className="min-w-[70px] px-3 transition-all duration-500">
                Continue
              </span>
              <Login className="w-[28px] transition-all duration-500" />
            </div>
          </CustomButton>
        </div>

        {isLoading && (
          <div className="w-full h-full absolute top-0  flex justify-center items-center bg-black/50 z-30">
            <img
              src={LoadingGif}
              alt="Loading"
              className="w-[50%] h-[50%] object-contain"
            />
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default PassResetVerifier;
