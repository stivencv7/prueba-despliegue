import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { authSchema } from "../../schema/create-schema-auth";
import CustomInput from "../../../../../Shared/CustomInput/CustomInput";
import Check from "../../../../../../assets/Icon/Check";
import Close from "../../../../../../assets/Icon/Close";
import Check2 from "../../../../../../assets/Icon/Check2";
import CheckGray from "../../../../../../assets/Icon/CheckGray";

const FormCreatePassword = ({
  onActionTriggered,
}: {
  onActionTriggered?: any;
}) => {
  const [t, i18n] = useTranslation("global");

  const [strength, setStrength] = useState(0);

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
    const data = {
      password: "12345",
      Conpassword: "12345",
    };
    // e.preventdefault();
    onActionTriggered("complete", undefined, data);
  };

  return (
    <div className="w-full h-full p-10 flex jucstify-center items-center relative rounded-[32px]  bg-[--background-dark-blue] shadow-lg">
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
        className="z-50 w-full"
      >
        <p
          className="text-base text-[--text-body] mb-4 cursor-pointer"
          onClick={() => onActionTriggered("previous")}
        >
          Back
        </p>
        <h2 className="text-[--text-body] text-lg leading-[22.1px] font-bold mb-7">
          {t("Auth.register.createPassword.setPassword")}
        </h2>
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
                  className="w-full h-[36px] rounded-[10px] bg-[--dark-gray] text-[--text-body] p-[8px] pr-[36px] outline-none focus:outline-none placeholder:text-[#A1A1A1] "
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
                  className="w-full h-[36px] rounded-[10px] bg-[--dark-gray] text-[--text-body] p-[8px] pr-[36px] outline-none focus:outline-none placeholder:text-[#A1A1A1] "
                  name={name}
                  error={Boolean(errors["confirmPassword"])}
                  helperText={
                    errors["confirmPassword"]
                      ? errors["confirmPassword"].message
                      : ""
                  }
                  showPassword={showConfirmPassword}
                  togglePasswordVisibility={toggleConfirmPasswordVisibility}
                  placeholder="Type password"
                />
              )}
              name="confirmPassword"
              control={control}
            />
          </div>
        </div>

        {/* <div className="flex justify-center items-center gap-3 px-5">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className={`h-2 w-full rounded-md ${
              index < strength ? "bg-green-600" : "bg-[#3E4347]"
            }`}
          />
        ))}
      </div> */}

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
      {/* <Lock
      className="absolute w-96 h-96 -bottom-28 -right-16 rotate-[40deg] opacity-15"
      color="#FFED00"
    /> */}
    </div>
  );
};

export default FormCreatePassword;
