import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import CustomInput from "../../Shared/CustomInput/CustomInput";
import CustomButton from "../../Shared/CustomButton/CustomButton";
import Login from "../../../assets/Icon/Login";
import IconGoogle from "../../../assets/Icon/IconGoogle";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import CustomSelectPhone from "../../Shared/CustomSelectPhone/CustomSelectPhone";
import InfoIcon from "@/assets/Icon/InfoIcon";
import CustomTooltip from "@/apps/Shared/CustomTooltip/CustomTooltip";

const schema = z
  .object({
    email: z.string().email().optional(),
    phone: z
      .string()
      // .regex(/^\d{10}$/)
      .optional(),
    password: z
      .string()
      .regex(/[0-9]/, "Debe contener al menos 1 número")
      .regex(/[A-Z]/, "Debe contener al menos 1 letra mayúscula")
      .min(8, "Debe tener al menos 8 caracteres")
      .refine((value) => !!value, { message: "La contraseña es obligatoria" }),
  })
  .refine((data) => data.email || data.phone, {
    message:
      "Debe proporcionar un email o un número de teléfono y una contraseña",
    path: ["email", "phone"],
  });

const show = {
  opacity: 1,
  display: "flex",
};

const hide = {
  opacity: 0,
  display: "none",
};

const SingIn = ({
  isvisible,
  setIsvisible,
}: {
  isvisible: boolean;
  setIsvisible: (value: boolean) => void;
}) => {
  const [t, i18n] = useTranslation("global");

  const navigate = useNavigate();

  const [strength, setStrength] = useState(0);

  const [val, setVal] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [visiblePhone, setVisiblePhone] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const {
    handleSubmit,
    watch,
    control,
    formState: { errors, isValid },
    setValue,
    getValues,
    clearErrors,
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      phone: "",
      password: "",
    },
  });

  const calculateStrength = (password: string) => {
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

  useEffect(() => {
    if (!isvisible) {
      setValue("email", "");
      setValue("phone", "");
      setValue("password", "");
      setVal(false);
      clearErrors();
    }
  }, [isvisible]);

  useEffect(() => {
    document.addEventListener("error", (e: any) => setVisiblePhone(e.detail));
  }, []);

  const onSubmit = (data: any) => {
    console.log(data);
    setTimeout(() => {
      // setIsLoading(false);
      navigate("SingIn/Otp");
    }, 1000);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
        className={`w-full  absolute  transition-all duration-700 ${
          !isvisible
            ? "translate-x-0 opacity-100"
            : "-translate-x-[110%] opacity-0"
        }`}
      >
        <div className="w-full flex flex-col mb-4 relative">
          <div className="flex items-center justify-between mb-2">
            <div className="w-full flex items-center gap-2">
              <span className="text-sm sm:text-[15px] font-normal text-[--text-body]">
                Email or Phone number
              </span>
              {(visiblePhone || errors.phone) && (
                <>
                  <InfoIcon
                    id="my-anchor-element"
                    className="cursor-pointer w-[18px]"
                    fill="#F76A6A"
                  />
                  <CustomTooltip
                    anchorSelect="#my-anchor-element"
                    place="left"
                    style={{
                      backgroundColor: "var(--dark-gray)",
                      color: "#fff",
                      padding: "5px",
                      borderRadius: "5px",
                      opacity: 1,
                      border: "2px solid #fff",
                      zIndex: 10000,
                    }}
                  >
                    <div className="w-[320px] p-2">
                      <span>
                        {visiblePhone
                          ? "El número ingresado no es válido para el país seleccionado. Por favor, revise y vuelva a intentarlo."
                          : errors.phone && errors.phone.message}
                      </span>
                    </div>
                  </CustomTooltip>
                </>
              )}
            </div>
            <span
              className="text-sm sm:text-[15px] font-normal text-[--yellow] cursor-pointer"
              onClick={() => {
                setVal(!val);
                setValue("email", "");
                setValue("phone", "");
              }}
            >
              {!val ? "Phone" : "Email"}
            </span>
          </div>
          <Controller
            render={({ field: { onChange, value, name } }) => (
              <motion.div
                animate={!val ? show : hide}
                transition={{ duration: 1.2 }}
              >
                <CustomInput
                  type="email"
                  value={value}
                  onChange={onChange}
                  className={`w-full h-[42px] pr-[40px] pl-[13px] rounded-[10px] bg-[--dark-gray] text-[--text-body] outline-none focus:outline-none placeholder:text-[--text-light-body] sm:text-[15px]`}
                  name={name}
                  error={Boolean(errors["email"])}
                  helperText={errors["email"] ? errors["email"].message : ""}
                  placeholder="Type here"
                />
              </motion.div>
            )}
            name="email"
            control={control}
          />
          <Controller
            render={({ field: { onChange, value, name } }) => (
              <motion.div
                className={`flex flex-col relative h-[42px] `}
                animate={val ? show : hide}
                transition={{ duration: 1.2 }}
              >
                <CustomSelectPhone
                  className="h-[42px]"
                  onChange={(e) => {
                    onChange(e);
                    setValue("phone", e, {
                      shouldValidate: true,
                    });
                  }}
                  isvisible={val ?? isvisible}
                  value={value}
                  name={name}
                />
              </motion.div>
            )}
            name="phone"
            control={control}
          />
        </div>

        {/* <CustomSelectPhone /> */}
        <div className="w-full flex flex-col gap-y-[7px] mb-9">
          <span className="text-sm sm:text-[15px] font-normal text-[--text-body]">
            password
          </span>
          <Controller
            render={({ field: { onChange, value, name } }) => (
              <CustomInput
                type="password"
                value={value}
                onChange={onChange}
                className="w-full h-[42px] pr-[40px] pl-[13px] rounded-[10px] bg-[--dark-gray] text-[--text-body] outline-none focus:outline-none placeholder:text-[--text-light-body] sm:text-[15px]"
                name={name}
                error={Boolean(errors["password"])}
                helperText={
                  errors["password"] ? errors["password"].message : ""
                }
                placeholder="Type password"
                showPassword={showPassword}
                togglePasswordVisibility={togglePasswordVisibility}
              />
            )}
            name="password"
            control={control}
          />
        </div>
        {/* <div className="flex justify-center items-center gap-3 px-5 mb-5">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className={`h-2 w-full rounded-md ${
                index < strength
                  ? strength === 1
                    ? "bg-[#FAE100] opacity-50"
                    : strength === 2
                    ? "bg-[#FAE100] opacity-80"
                    : strength === 3 && "bg-[#FAE100] opacity-100"
                  : "bg-[#3E4347]"
              }`}
            />
          ))}
        </div> */}

        <CustomButton
          className={`w-full h-[42px] flex justify-center items-center gap-x-2 bg-[--yellow] disabled:bg-[--yellow-disabled] rounded-[60px] px-[12px] text-lg font-bold  text-[#14181F] mb-4`}
          onclick={handleSubmit(onSubmit)}
          disabled={!isValid}
        >
          <span className="min-w-[70px] px-3">
            {t("Auth.login.loginButton")}
          </span>
          <Login className="w-[28px]" />
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
          {t("Auth.login.newUserPrompt")}
          <span
            className=" text-[--yellow] ml-1 cursor-pointer font-bold"
            // onClick={handleVisibleReg}
            onClick={() => setIsvisible(true)}
          >
            {t("Auth.login.createAccount")}
          </span>
        </div>

        <p
          className="font-bold text-[--yellow] text-center text-sm sm:text-base mb-4 cursor-pointer"
          onClick={() => navigate("ForgotPassword")}
        >
          {t("Auth.login.ForgotPassword")}
        </p>
      </form>
    </div>
  );
};

export default SingIn;
