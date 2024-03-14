import React, { useRef, useState } from "react";
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Controller, useForm } from "react-hook-form";
import CustomInput from "../../Shared/CustomInput/CustomInput";
import CustomButton from "../../Shared/CustomButton/CustomButton";
import Login from "../../../assets/Icon/Login";
import "./ForgotPassword.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemaEmail } from "./schema/create-schema";
import LoadingGif from "../../../assets/Icon/loading-yellow.gif";
import { motion } from "framer-motion";

const ForgotPassword = () => {
  const [t, i18n] = useTranslation("global");

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isVery, setIsVery] = useState(false);

  const {
    handleSubmit,
    watch,
    control,
    formState: { errors, isValid },
    setValue,
    getValues,
    clearErrors,
  } = useForm({
    resolver: zodResolver(schemaEmail),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsVery(true);
      navigate("/Auth/forgot-password-code");
    }, 1000);
  };

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
        className="w-full sm:w-auto  rounded-[32px] shadow-lg  bg-[--background-soft-blue] relative overflow-hidden"
      >
        <div className=" px-[22px] py-[36px]  sm:p-[36px]">
          <p
            className="mb-5 text-base font-normal leading-[20.8px] text-[--text-body] cursor-pointer opacity-[0.6]"
            onClick={() => navigate("/Auth")}
          >
            {t("Auth.register.opt.back")}
          </p>
          <h2 className="text-[--text-body] text-base leading-[22.1px] font-bold mb-3">
            Forgot your Password?
          </h2>
          <p className="mb-4 w-full sm:w-[600px] text-sm sm:text-base font-normal text-[--text-body] leading-[20.8px]">
            Introduce your <span className="text-[--yellow]">email</span> and
            you will receive the{" "}
            <span className="text-[--yellow]">instructions</span> for your
            password <span className="text-[--yellow]">recovery</span>
          </p>

          <div className="w-full flex flex-col gap-y-[4px] mb-7 transition-all duration-500">
            <span className="text-sm sm:text-base font-normal text-[--text-body]">
              Email
            </span>
            <Controller
              render={({ field: { onChange, value, name } }) => (
                <CustomInput
                  type="email"
                  value={value}
                  onChange={onChange}
                  className="w-full h-[40px] rounded-[10px] bg-[--dark-gray] text-[--text-body] p-[8px] pr-[36px] outline-none focus:outline-none placeholder:text-[--text-light-body]"
                  name={name}
                  error={Boolean(errors["email"])}
                  helperText={errors["email"] ? errors["email"].message : ""}
                  placeholder="Type email"
                />
              )}
              name="email"
              control={control}
            />
          </div>

          {/* {!isVery && ( */}
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

export default ForgotPassword;

{
  /* <div
className={` w-full flex justify-center items-center flex-row gap-2 absolute transition-all duration-500 ${
  isLoading ? "translate-y-0" : "-translate-y-[300%]"
}`}
>
<div className="w-[10px] h-[10px] rounded-full bg-black animate-bounce"></div>
<div className="w-[10px] h-[10px] rounded-full bg-black animate-bounce [animation-delay:-.5s]"></div>
<div className="w-[10px] h-[10px] rounded-full bg-black animate-bounce [animation-delay:-.5s]"></div>
</div> */
}

{
  /* <div
className={`flex absolute w-full justify-center items-center transition-all duration-500 `}
>
<span
  className={`min-w-[70px] px-3 transition-all duration-500 ${
    !isLoading ? "translate-x-0" : "-translate-x-[3000%]"
  }`}
>
  Continue
</span>
<Login
  className={`w-[28px] transition-all duration-500 ${
    !isLoading ? "translate-x-0" : "translate-x-[1700%]"
  }`}
/>
</div> */
}
