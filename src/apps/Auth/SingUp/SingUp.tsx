import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import IconGoogle from "../../../assets/Icon/IconGoogle";
import Login from "../../../assets/Icon/Login";
import CustomButton from "../../Shared/CustomButton/CustomButton";
import Check2 from "../../../assets/Icon/Check2";
import CustomInput from "../../Shared/CustomInput/CustomInput";
import HandPoint from "../../../assets/Icon/HandPoint";

const _schema = z.object({
  email: z.string().email("Invalid email format"),
  terms: z.boolean().refine((value) => value === true, {
    message: "Debes aceptar las políticas",
    path: ["terms"],
  }),
});

const SingUp = ({
  isvisible,
  setIsvisible,
}: {
  isvisible: boolean;
  setIsvisible: (value: boolean) => void;
}) => {
  const [t, i18n] = useTranslation("global");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [check, setCheck] = useState(false);
  const [check2, setCheck2] = useState(false);

  const {
    handleSubmit,
    watch,
    control,
    formState: { errors, isValid },
    setValue,
    getValues,
    clearErrors,
  } = useForm({
    resolver: zodResolver(_schema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      terms: false,
    },
  });

  watch();

  useEffect(() => {
    if (isvisible) {
      setValue("email", "");
      setValue("terms", false);
      clearErrors();
    }
  }, [isvisible]);

  const onSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const params = `${!check ? "person" : "Company"}`;
      navigate(`/Auth/SingUp/Otp/${params}`);
    }, 2000);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
        className={`w-full absolute  transition-all duration-700 ${
          isvisible
            ? "translate-x-0 opacity-100"
            : "translate-x-[110%] opacity-0"
        }`}
      >
        <p className="text-sm sm:text-base font-bold text-[--text-body] mb-3 leading-[20.8px] w-[217px] ">
          Create an account
        </p>

        <div className="w-full flex items-center gap-5 mb-4">
          <div className="flex justify-center items-center gap-4">
            <div className="flex items-center relative cursor-pointer">
              <input
                type="checkbox"
                className="appearance-none w-[20px] h-[20px] rounded-[4px] relative bg-[--dark-gray] hover:bg-[--light-grey] cursor-pointer"
                onChange={() => {
                  if (!check) {
                    return;
                  }
                  setCheck(!check);
                }}
              />
              <div
                className={`absolute w-full h-full flex justify-center items-center bg-[--dark-gray] hover:bg-[--light-grey] rounded-[4px] transition-all duration-200 ${
                  !check ? "scale-100" : "scale-0"
                }`}
              >
                <div className="bg-[--yellow] w-[11px] h-[11px] rounded-[3px]" />
              </div>
            </div>
            <span className="text-balance text-[--text-body]">Person</span>
          </div>
          <div className="flex justify-center items-center gap-4">
            <div className="flex items-center relative cursor-pointer">
              <input
                type="checkbox"
                className="appearance-none w-[20px] h-[20px] rounded-[4px] relative bg-[--dark-gray] cursor-pointer"
                onChange={() => {
                  if (check) {
                    return;
                  }
                  setCheck(!check);
                }}
              />
              {/* {check && ( */}
              <div
                className={`absolute w-full h-full flex justify-center items-center bg-[--dark-gray] rounded-[4px] transition-all duration-200 ${
                  check ? "scale-100" : "scale-0"
                }`}
              >
                <div className="bg-[--yellow] w-[11px] h-[11px] rounded-[3px]" />
              </div>
              {/* )} */}
            </div>
            <span className="text-balance text-[--text-body]">Company</span>
          </div>
        </div>

        <div className="w-full flex flex-col gap-y-[2px] mb-4">
          <span className="text-sm sm:text-base font-normal text-[--text-body]">
            Email
          </span>
          <Controller
            render={({ field: { onChange, value, name } }) => (
              <CustomInput
                type="email"
                value={value}
                onChange={onChange}
                className="w-full h-[42px] pt-[11px] pb-[13px] pr-[30px] pl-[13px] rounded-[10px] bg-[--dark-gray] text-[--text-body] outline-none focus:outline-none placeholder:text-[--text-light-body] "
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

        <p className="text-sm sm:text-base font-normal text-[--text-body] w-full text-left sm:px-2 mb-5">
          {t("Auth.register.sendConfirmationCode.WeWillSendYouA")}{" "}
          {t("Auth.register.sendConfirmationCode.code")}
          <span className="font-normal ml-1">
            {t("Auth.register.sendConfirmationCode.toYour")}
          </span>
          <span className="font-bold ml-1">
            {t("Auth.register.sendConfirmationCode.email")}
          </span>
          <span className="font-normal ml-1">
            {t("Auth.register.sendConfirmationCode.toConfirm")}
          </span>
        </p>

        <div className="flex items-center gap-x-5 transition-transform duration-500 sm:w-[431px] h-[42px] sm:px-2 mb-6">
          <div className="flex items-center relative cursor-pointer">
            <Controller
              render={({ field: { onChange, value, name } }) => (
                <div className="flex items-center relative cursor-pointer">
                  <input
                    type="checkbox"
                    name={name}
                    value={value ? "true" : "false"} // Convertir el booleano a string
                    className={`appearance-none w-[22px] h-[22px] rounded-[4px] relative bg-[--dark-gray] cursor-pointer z-20 ${
                      getValues("terms") && "opacity-10"
                    }`}
                    onChange={onChange}
                  />
                  {getValues("terms") && (
                    <div className="absolute w-full h-full flex justify-center items-center bg-[--dark-gray] rounded-[4px]">
                      <Check2
                        className={`text-[--yellow] w-[15px] h-[10px] transition-all duration-300 ${
                          getValues("terms") ? "scale-100" : "scale-0"
                        }`}
                      />
                    </div>
                  )}
                </div>
              )}
              name="terms"
              control={control}
            />
          </div>
          <p className="text-sm sm:text-base text-[--text-body] sm:w-[355px]">
            By creating an account , i agree to Vank´s{" "}
            <span className="font-bold underline cursor-pointer">
              Terms of service
            </span>{" "}
            and
            <span className="font-bold underline cursor-pointer ml-1">
              privacy policy
            </span>
          </p>
        </div>

        <CustomButton
          className={`w-full h-[42px] flex justify-center items-center gap-x-2 bg-[--yellow] disabled:bg-[--yellow-disabled] rounded-[60px] px-[12px] text-lg font-bold  text-[--background-dark-blue] mb-4 relative overflow-hidden`}
          onclick={onSubmit}
          disabled={!isValid}
        >
          <div
            className={` w-full flex justify-center items-center flex-row gap-2 absolute transition-all duration-500 ${
              isLoading ? "translate-y-0" : "-translate-y-[300%]"
            }`}
          >
            <div className="w-[10px] h-[10px] rounded-full bg-black animate-bounce"></div>
            <div className="w-[10px] h-[10px] rounded-full bg-black animate-bounce [animation-delay:-.5s]"></div>
            <div className="w-[10px] h-[10px] rounded-full bg-black animate-bounce [animation-delay:-.5s]"></div>
          </div>
          {/* <div
            className={` w-full flex justify-center items-center flex-row gap-2 absolute transition-all duration-500 ${
              !isValid ? "translate-y-0" : "-translate-y-[300%]"
            }`}
          >
            <span className="text-base">Complete</span>
            <HandPoint className="w-[18px] animate-bounce"/>
          </div> */}
          <div
            className={`flex absolute w-full justify-center items-center transition-all duration-500 `}
          >
            <span
              className={`min-w-[70px] px-3 transition-all duration-500 ${
                !isLoading ? "translate-x-0" : "-translate-x-[300%]"
              }`}
            >
              {t("Auth.register.button")}
            </span>
            <Login
              className={`w-[28px] transition-all duration-500 ${
                !isLoading ? "translate-x-0" : "translate-x-[1700%]"
              }`}
            />
          </div>
        </CustomButton>

        <div className="flex flex-col justify-center items-center space-y-4 mb-5">
          <div className="flex w-full justify-between gap-4 items-center">
            <hr className="border-[1px] border-[--light-grey] w-full  rounded-full" />
            <p className="text-center text-base text-[--text-body]">Or</p>
            <hr className="border-[1px] border-[--light-grey]  w-full rounded-full" />
          </div>
          <div
            // onClick={() => loginWithRedirect()}
            className="min-w-[180px] h-[42px] py-[20px] px-[37px] dark:bg-[--dark-gray] p-2 flex justify-between items-center gap-5 rounded-[60px] cursor-pointer"
          >
            <span className="font-normal text-base text-[--text-body]">
              Continue with <span className="font-bold">Google</span>
            </span>
            <IconGoogle />
          </div>
        </div>

        <div className="w-full text-center text-[--text-body] text-sm sm:text-base font-normal transition-all duration-300 mb-4">
          {/* {t("Auth.login.newUserPrompt")} */}
          Already have an Account?
          <span
            className=" text-[--yellow] ml-1 cursor-pointer font-bold"
            onClick={() => setIsvisible(false)}
          >
            Login
            {/* {t("Auth.login.createAccount")} */}
          </span>
        </div>
      </form>
    </div>
  );
};

export default SingUp;
