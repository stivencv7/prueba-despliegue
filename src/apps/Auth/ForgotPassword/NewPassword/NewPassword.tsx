import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import CustomInput from "../../../Shared/CustomInput/CustomInput";
import Check2 from "../../../../assets/Icon/Check2";
import CheckGray from "../../../../assets/Icon/CheckGray";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import Header from "../../Header/Header";
import { useNavigate } from "react-router-dom";
import LoadingGif from "../../../../assets/Icon/loading-yellow.gif";
import { motion } from "framer-motion";
import { authSchema } from "../../SingUp/MultiStepFormPerson/schema/create-schema-auth";
import Close from "@/assets/Icon/Close";

const NewPassword = () => {
  const [t, i18n] = useTranslation("global");

  const [strength, setStrength] = useState(0);

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const {
    handleSubmit,
    watch,
    control,
    formState: { errors, isValid },
    getValues,
  } = useForm({
    resolver: zodResolver(authSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      password: "",
      confirmPassword: "",
      phone: "",
    },
  });

  watch();

  const calculateStrength = (password?: string | any) => {
    let score = 0;

    if (password.length >= 8) {
      score++;
    }
    if (/\d/.test(password)) {
      score++;
    }
    if (/[A-Z]/.test(password)) {
      score++;
    }

    setStrength(score);
  };

  useEffect(() => {
    calculateStrength(getValues("password"));
  }, [getValues("password")]);

  const onSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/Auth");
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
        className="w-full sm:w-auto rounded-[32px] shadow-lg bg-[--background-soft-blue] relative overflow-hidden"
      >
        <form
          onSubmit={handleSubmit((data: any) => {
            console.log(data);
          })}
          className="z-50 w-full px-[22px] py-[36px] sm:p-[36px]"
        >
          {/* <p
            className="text-base text-[--text-body] mb-4 cursor-pointer"
            //   onClick={() => onActionTriggered("previous")}
          >
            Back
          </p> */}
          <h2 className="text-[--text-body] text-lg leading-[22.1px] font-bold mb-3">
            {/* {t("Auth.register.createPassword.setPassword")} */}
            Reset your password
          </h2>
          <p className="w-full sm:w-[600px] text-sm sm:text-base font-normal text-[--text-body] leading-[20.8px] mb-5">
            Please, introduce your{" "}
            <span className="text-[--yellow]">new password</span>
          </p>
          <div className="w-full grid grid-cols-1 2xl:gap-y-2">
            <div className="w-full flex flex-col gap-y-[7px] mb-3">
              <span className="text-sm sm:text-base font-normal text-[--text-body]">
                password
              </span>
              <Controller
                render={({ field: { onChange, value, name } }) => (
                  <CustomInput
                    type="password"
                    value={value}
                    onChange={onChange}
                    className="w-full h-[36px] rounded-[10px] bg-[--dark-gray] text-[--text-body] p-[8px] pr-[36px] outline-none focus:outline-none placeholder:text-[--text-light-body] "
                    name={name}
                    error={Boolean(errors["password"])}
                    helperText={
                      errors["password"] ? errors["password"].message : ""
                    }
                    showPassword={showPassword}
                    togglePasswordVisibility={togglePasswordVisibility}
                    placeholder="Type password"
                  />
                )}
                name="password"
                control={control}
              />
            </div>
            <div className="w-full flex flex-col gap-y-[7px] 2xl:mb-3">
              <span className="text-sm sm:text-base font-normal text-[--text-body]">
                Confirm Password
              </span>
              <Controller
                render={({ field: { onChange, value, name } }) => (
                  <CustomInput
                    type="password"
                    value={value}
                    onChange={onChange}
                    className="w-full h-[36px] rounded-[10px] bg-[--dark-gray] text-[--text-body] p-[8px] pr-[36px] outline-none focus:outline-none placeholder:text-[--text-light-body] "
                    name={name}
                    error={Boolean(errors["confirmPassword"])}
                    helperText={
                      errors["confirmPassword"]
                        ? errors["confirmPassword"].message
                        : ""
                    }
                    showPassword={showConfirmPassword}
                    togglePasswordVisibility={toggleConfirmPasswordVisibility}
                    placeholder="Type Confirm Password"
                  />
                )}
                name="confirmPassword"
                control={control}
              />
            </div>
          </div>

          <ul className="mt-5 mb-5 grid grid-cols-2 gap-[18px] px-[8px]">
            <li
              className={`text-sm sm:text-base text-[--text-light-body] flex items-center gap-[10px] min-w-[191px]`}
            >
              {getValues("password")?.length < 8 ? (
                <Close className="w-[14px] h-[14px]" />
              ) : getValues("password") ? (
                <Check2 className="w-[14px] h-[14px]" />
              ) : (
                <CheckGray className="w-[14px] h-[14px]" />
              )}
              <p>{t("Auth.register.createPassword.rules.one")}</p>
            </li>
            <li
              className={`text-sm sm:text-base text-[--text-light-body] flex items-center gap-[10px] min-w-[164px]`}
            >
              {!/\d/?.test(getValues("password")) ? (
                <Close className="w-[14px] h-[14px]" />
              ) : getValues("password") ? (
                <Check2 className="w-[14px] h-[14px]" />
              ) : (
                <CheckGray className="w-[14px] h-[14px]" />
              )}
              <p>{t("Auth.register.createPassword.rules.two")}</p>
            </li>
            <li
              className={`text-sm sm:text-base text-[--text-light-body] flex items-center gap-[10px]`}
            >
              {!/[A-Z]/?.test(getValues("password")) ? (
                <Close className="w-[14px] h-[14px]" />
              ) : getValues("password") ? (
                <Check2 className="w-[14px] h-[14px]" />
              ) : (
                <CheckGray className="w-[14px] h-[14px]" />
              )}
              <p>{t("Auth.register.createPassword.rules.three")}</p>
            </li>
            <li
              className={`text-sm sm:text-base text-[--text-light-body] flex items-center gap-[10px]`}
            >
              {getValues("confirmPassword") &&
              getValues("confirmPassword") !== getValues("password") ? (
                <Close className="w-[14px] h-[14px]" />
              ) : getValues("confirmPassword") ? (
                <Check2 className="w-[14px] h-[14px]" />
              ) : (
                !getValues("confirmPassword") && (
                  <Close className="w-[14px] h-[14px]" />
                )
              )}
              <p>{t("Auth.register.createPassword.rules.four")}</p>
            </li>
          </ul>

          <button
            type="submit"
            className={`flex justify-center items-center gap-x-2 w-full h-[40px] bg-[--yellow] disabled:bg-[--yellow-disabled] rounded-[60px] text-base font-bold leading-[20.8px] text-[#14181F]`}
            onClick={onSubmit}
            disabled={!isValid}
          >
            Continuar
          </button>
        </form>
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
      {/* <Lock
      className="absolute w-96 h-96 -bottom-28 -right-16 rotate-[40deg] opacity-15"
      color="#FFED00"
    /> */}
    </div>
  );
};

export default NewPassword;
