import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import { createUserInfoState } from "../../state";
import Colombia from "../../../../../../assets/Icon/Colombia";
import Peru from "../../../../../../assets/Icon/Peru";
import Chile from "../../../../../../assets/Icon/Chile";
import UnitedStates from "../../../../../../assets/Icon/UnitedStates";
import { Controller, useForm } from "react-hook-form";
import { infoSchema } from "../../schema/create-schema-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Default } from "../../Default";
import CustomInput from "../../../../../Shared/CustomInput/CustomInput";
import CustomSelectCountries from "../../CustomSelectCountries/CustomSelectCountries";

const FormCreateInfo = ({
  onActionTriggered,
  verificatioId,
}: {
  onActionTriggered?: any;
  setVerificatioId: (value: string) => void;
}) => {
  const [t, i18n] = useTranslation("global");

  const [userPayload, setUserPayload] = useRecoilState(createUserInfoState);
  const [countries, setCountries] = useState([]);

  const [phone, setPhone] = useState([
    {
      country: "Colombia",
      calling_code: 57,
      icon: <Colombia className="w-4 h-4" />,
    },
    {
      country: "Peru",
      calling_code: 51,
      icon: <Peru className="w-4 h-4" />,
    },
    {
      country: "Chile",
      calling_code: 56,
      icon: <Chile className="w-4 h-4" />,
    },
    {
      country: "United States",
      calling_code: 1,
      icon: <UnitedStates className="w-4 h-4" />,
    },
  ]);

  const [isIndex, setIsIndex] = useState(0);
  const [open, setOpen] = useState(false);

  const {
    handleSubmit,
    watch,
    control,
    formState: { errors, isValid },
    getValues,
    setValue,
    clearErrors,
    setFocus,
  } = useForm({
    resolver: zodResolver(infoSchema),
    mode: "onChange",
    // reValidateMode: "onChange",
    defaultValues: {
      country: "",
      firstName: "",
      lastNames: "",
      date: "",
      day: "",
      month: "",
      year: "",
      gender: "",
      phone: "",
    },
  });

  useEffect(() => {
    fetch("https://restcountries.com/v2/all?fields=name")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCountries(data);
      });
  }, []);

  useEffect(() => {
    fetch("https://www.universal-tutorial.com/api/getaccesstoken", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "api-token":
          "pNxYbbXgTDsZ6oMIYf4IYe8K9qobX2jPq3ExK25oAPJFW4t0k9aSS1O-XWzBo1Bq0rI",
        "user-email": "frontend@thisisvank.com",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        fetch("https://www.universal-tutorial.com/api/cities/Quindio", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${data?.auth_token}`,
            Accept: "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const updateDateFields = (dateString?: any) => {
      const [year, month, day] = dateString.split("-");
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().split("T")[0];
      if (dateString === formattedDate) {
        setValue("date", "");
        return;
      }
      setValue("day", day, { shouldValidate: true });
      setValue("month", month, { shouldValidate: true });
      setValue("year", year, { shouldValidate: true });
    };

    updateDateFields(getValues("date"));
  }, [getValues("date")]);

  watch();

  useEffect(() => {
    const _userPayload = { ...Default };

    if (_userPayload?.country) {
      setValue("country", _userPayload?.country, { shouldValidate: true });
    }

    if (_userPayload?.firstName) {
      setValue("firstName", _userPayload?.firstName, { shouldValidate: true });
    }

    if (_userPayload?.lastName) {
      setValue("lastNames", _userPayload?.lastName, { shouldValidate: true });
    }

    if (_userPayload?.date) {
      setValue("date", _userPayload?.date, { shouldValidate: true });
    }

    if (_userPayload?.gender) {
      setValue("gender", _userPayload?.gender, { shouldValidate: true });
    }
  }, [userPayload]);

  const onSubmit = (data?: any) => {
    console.log(data);
    setUserPayload((currentPayload?: any) => {
      const updatedBenefitPayload = {
        ...currentPayload,
        ...data,
      };

      console.log(updatedBenefitPayload);
      return updatedBenefitPayload;
    });
    onActionTriggered("next");
  };

  return (
    <div className="w-full h-[450px] p-10 flex jucstify-center  items-center relative rounded-[32px]  bg-[--background-dark-blue] shadow-lg">
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
        className="z-40"
      >
        <p
          className="text-base text-[--text-body] mb-4 cursor-pointer"
          onClick={() => onActionTriggered("previous")}
        >
          Back
        </p>
        <h2 className="text-[--text-body] text-lg leading-[22.1px] font-bold mb-1">
          Identity Confirmation
        </h2>
        <p className="text-base text-[--text-body] mb-4">
          Please fill in exactly as it appears on your ID, passport, or driver's
          license
        </p>
        <div className="w-full grid grid-cols-2 gap-x-7 gap-y-3 mb-5">
          {/* <div className="w-full flex flex-col  col-span-2 gap-y-[6px]">
            <span className="text-sm sm:text-base font-normal text-[#FFFFFF]">
              Nationality
            </span>
            <Controller
              render={({ field: { onChange, value, name } }) => (
                <CustomSelectCountries
                  data={countries}
                  name={name}
                  value={getValues("country")?.toLowerCase()}
                  onChange={onChange}
                  getValues={getValues("country")?.toLowerCase()}
                  onValue={(_value) =>
                    setValue("country", _value, {
                      shouldValidate: true,
                    })
                  }
                  placeholder="Search for data"
                />
              )}
              name="country"
              control={control}
            />
          </div> */}
          <div className="w-full flex flex-col gap-y-[6px]">
            <span className="text-sm sm:text-base font-normal text-[--text-body]">
              First Name
            </span>
            <Controller
              render={({ field: { onChange, value, name } }) => (
                <CustomInput
                  type="text"
                  value={value}
                  onChange={onChange}
                  className="w-full h-[36px] rounded-[10px] bg-[--dark-gray] text-[--text-body] p-[8px] pr-[36px] outline-none focus:outline-none placeholder:text-[#A1A1A1] text-sm"
                  name={name}
                  error={Boolean(errors["firstName"])}
                  helperText={
                    errors["firstName"] ? errors["firstName"].message : ""
                  }
                  placeholder="Enter First Name"
                />
              )}
              name="firstName"
              control={control}
            />
          </div>
          <div className="w-full flex flex-col gap-y-[7px]">
            <span className="text-sm sm:text-base font-normal text-[#FFFFFF]">
              Last Names
            </span>
            <Controller
              render={({ field: { onChange, value, name } }) => (
                <CustomInput
                  type="text"
                  value={value}
                  onChange={onChange}
                  className="w-full h-[36px] rounded-[10px] bg-[--dark-gray] text-[--text-body] p-[8px] pr-[36px] outline-none focus:outline-none placeholder:text-[#A1A1A1] text-sm"
                  name={name}
                  error={Boolean(errors["lastNames"])}
                  helperText={
                    errors["lastNames"] ? errors["lastNames"].message : ""
                  }
                  placeholder="Enter Last Names"
                />
              )}
              name="lastNames"
              control={control}
            />
          </div>
          <div className="w-full flex flex-col gap-y-[5px] ">
            <label className="text-base text-[#EFF0F1]">Date of birth</label>
            <div className="w-full flex gap-4 items-center">
              <Controller
                render={({ field: { onChange, value, name } }) => (
                  <input
                    type="text"
                    value={value}
                    name={name}
                    onChange={onChange}
                    className="w-full h-[36px]  px-2 text-center rounded-[10px] bg-[--dark-gray] text-[--text-body] outline-none focus:outline-none placeholder:text-[#A1A1A1] "
                    placeholder="DD"
                    maxLength={2}
                    disabled
                  />
                )}
                name="day"
                control={control}
              />
              <Controller
                render={({ field: { onChange, value, name } }) => (
                  <input
                    type="text"
                    value={value}
                    name={name}
                    id="month"
                    onChange={onChange}
                    className="w-full h-[36px]  px-2 text-center rounded-[10px] bg-[--dark-gray] text-[--text-body] outline-none focus:outline-none placeholder:text-[#A1A1A1] "
                    placeholder="MM"
                    maxLength={2}
                    disabled
                  />
                )}
                name="month"
                control={control}
              />
              <Controller
                render={({ field: { onChange, value, name } }) => (
                  <input
                    type="text"
                    value={value}
                    onChange={onChange}
                    className="w-full h-[36px]  px-2 text-center rounded-[10px] bg-[--dark-gray] text-[--text-body] outline-none focus:outline-none placeholder:text-[#A1A1A1] "
                    name={name}
                    id="year"
                    placeholder="YYYY"
                    maxLength={4}
                    disabled
                  />
                )}
                name="year"
                control={control}
              />
              {/* {!userPayload?.date && (
                <Controller
                  render={({ field: { onChange, value, name } }) => (
                    <DatePicker
                      render={<Icon className="text-white" />}
                      placeholder="Selecciona una fecha"
                      className="bg-dark yellow"
                      value={value}
                      name={name}
                      onChange={(value) =>
                        onChange(value?.format("YYYY-MM-DD"))
                      }
                    />
                  )}
                  name="date"
                  control={control}
                />
              )} */}
            </div>
            <p className="text-red-600">
              {errors && errors?.date && errors?.date?.message}
            </p>
          </div>
          <div className="w-full flex flex-col gap-y-[7px]">
            <span className="text-sm sm:text-base font-normal text-[#FFFFFF]">
              Phone Number
            </span>
            <Controller
              render={({ field: { onChange, value, name } }) => (
                <div className="flex items-center w-full gap-2">
                  <button
                    id="dropdown-phone-button"
                    data-dropdown-toggle="dropdown-phone"
                    className="inline-flex relative items-center justify-center gap-2 w-[25%] h-[36px] py-2.5 text-sm font-medium text-center border-[#A1A1A1] bg-[--dark-gray] text-[--text-body] rounded-lg"
                    type="button"
                    onClick={() => setOpen(!open)}
                  >
                    +{phone[isIndex]?.calling_code}
                  </button>
                  <input
                    type="text"
                    id="phone-input"
                    name={name}
                    value={value}
                    onChange={onChange}
                    className="block p-2.5 w-full h-[36px] z-20 text-sm bg-[--dark-gray] text-[--text-body] rounded-lg dark:placeholder-[#A1A1A1] dark:text-white outline-none"
                    placeholder="000-000-000"
                    required
                  />
                </div>
              )}
              name="phone"
              control={control}
            />
          </div>
        </div>

        <button
          type="submit"
          className={`flex justify-center items-center gap-x-2 w-full h-[40px] bg-[--yellow] disabled:bg-[--yellow-disabled] rounded-[60px] text-base font-bold leading-[20.8px] text-[#14181F]`}
          onClick={handleSubmit(onSubmit)}
          disabled={!isValid}
        >
          Continuar
        </button>
      </form>

      <div
        onClick={() => setOpen(!open)}
        className={`fixed inset-0 z-40 flex justify-center items-center transition-colors ${
          open ? "visible bg-black/50" : "invisible"
        }`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`bg-[#191E25] rounded-xl shadow p-6 transition-all w-4/12 ${
            open ? "scale-95 opacity-100" : "scale-100 opacity-0"
          }`}
        >
          <div className="w-full flex justify-center items-center gap-5 mb-2">
            <input
              type="text"
              id="phone-input"
              className="block p-2.5 w-full z-20 text-sm bg-[#3E4347] text-[#EFF0F1] rounded-lg border-s-0 dark:border-gray-600 dark:placeholder-[#A1A1A1] dark:text-white outline-none"
              placeholder="Enter Country"
              required
            />
            <span className="text-2xl">x</span>
          </div>
          <ul
            className={`z-50 h-full  transition-all duration-300 w-full  rounded-lg  bg-[#3E4347] text-[#EFF0F1] overflow-y-hidden`}
          >
            {phone?.map((countri, index) => (
              <li
                key={index}
                className={`w-full flex justify-between items-center py-2 px-4 cursor-pointer ${
                  isIndex !== index
                    ? "hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    : "bg-gray-600 text-white"
                }`}
                onClick={() => {
                  setIsIndex(index);
                  setOpen(!open);
                }}
              >
                <div className="flex items-center gap-3">
                  <span>{countri?.icon}</span>
                  <span>{countri?.country}</span>
                </div>
                <span>+{countri?.calling_code}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* <User
        className="absolute w-96 h-96 -top-7 right-7 rotate-[45deg] opacity-15"
        color="#FFED00"
      /> */}
    </div>
  );
};

export default FormCreateInfo;
