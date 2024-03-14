import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import { createUserInfoState } from "../../state";
import Colombia from "../../../../../../assets/Icon/Colombia";
import Peru from "../../../../../../assets/Icon/Peru";
import Chile from "../../../../../../assets/Icon/Chile";
import UnitedStates from "../../../../../../assets/Icon/UnitedStates";
import { Controller, set, useForm } from "react-hook-form";
import { infoSchema } from "../../schema/create-schema-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Default } from "../../Default";
import CustomInput from "../../../../../Shared/CustomInput/CustomInput";
import CustomSelectCountries from "../../../../../Shared/CustomSelectCountries/CustomSelectCountries";
import CustomSelectPhone from "../../../../../Shared/CustomSelectPhone/CustomSelectPhone";
import InfoIcon from "@/assets/Icon/InfoIcon";
import CustomTooltip from "@/apps/Shared/CustomTooltip/CustomTooltip";

const FormCreateInfo = ({ onActionTriggered }: { onActionTriggered?: any }) => {
  const [t, i18n] = useTranslation("global");

  const [userPayload, setUserPayload] = useRecoilState(createUserInfoState);
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [visiblePhone, setVisiblePhone] = useState(false);

  const [selected, setSelected] = useState({
    country: "",
  });

  const {
    handleSubmit,
    watch,
    control,
    formState: { errors, isValid },
    getValues,
    setValue,
    setError,
  } = useForm({
    resolver: zodResolver(infoSchema),
    mode: "onChange",
    // reValidateMode: "onChange",
    defaultValues: {
      country: "",
      documentType: "",
      documentNumer: "",
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

  const formatCountryForList = (items: any) => {
    if (!items && !items.length) {
      return [];
    }
    return items?.map((ite?: any) => ({
      name: ite?.name ?? "",
    }));
  };

  useEffect(() => {
    setIsLoading(true);
    fetch("https://restcountries.com/v2/all?fields=name")
      .then((res) => res.json())
      .then((data) => {
        const formt = formatCountryForList(data);
        setCountries(formt);
        setIsLoading(false);
      });

    document.addEventListener("error", (e: any) => setVisiblePhone(e.detail));
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
    if (_userPayload?.documentType) {
      setValue("documentType", _userPayload?.documentType, {
        shouldValidate: true,
      });
    }
    if (_userPayload?.documentNumber) {
      setValue("documentNumer", _userPayload?.documentNumber, {
        shouldValidate: true,
      });
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

  console.log(errors);

  return (
    <div className="w-full h-full p-10 flex jucstify-center  items-center rounded-[32px]  bg-[--background-dark-blue] shadow-lg transition-all duration-300">
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
        className="z-10"
      >
        <p
          className="text-base text-[--text-body] mb-2 2xl:mb-4 cursor-pointer w-[70px]"
          onClick={() => onActionTriggered("previous")}
        >
          Back
        </p>
        <h2 className="text-[--text-body] text-[17px]] leading-[22.1px] font-bold mb-1">
          Identity Confirmation
        </h2>
        <p className="text-[15px] text-[--text-body] mb-4">
          Please fill in exactly as it appears on your ID, passport, or driver's
          license
        </p>
        <div className="w-full grid grid-cols-2 items-center  gap-x-7 gap-y-3 mb-2 2xl:mb-5">
          <div className="w-full flex flex-col  col-span-2 gap-y-[6px]">
            <span className="sm:text-sm text-base font-normal text-[#FFFFFF]">
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
                  isLoading={isLoading}
                  selected={selected.country}
                  setSelected={setSelected}
                />
              )}
              name="country"
              control={control}
            />
          </div>
          <div className="w-full flex flex-col  gap-y-[6px]">
            <span className="sm:text-sm text-base font-normal text-[#FFFFFF]">
              Document Type
            </span>
            <Controller
              render={({ field: { onChange, value, name } }) => (
                <CustomSelectCountries
                  data={[
                    { name: "DNI" },
                    { name: "Pasaporte" },
                    { name: "Carnet de conducir" },
                    { name: "Tarjeta de identificación" },
                    { name: "NIE" },
                    { name: "Cédula de ciudadanía" },
                    // Puedes añadir más tipos de documentos según sea necesario
                  ]}
                  name={name}
                  value={value}
                  onChange={onChange}
                  getValues={getValues("documentType")?.toLowerCase()}
                  onValue={(_value) =>
                    setValue("documentType", _value, {
                      shouldValidate: true,
                    })
                  }
                  placeholder="Search for data"
                  isLoading={isLoading}
                  selected={selected.country}
                  setSelected={setSelected}
                />
              )}
              name="documentType"
              control={control}
            />
          </div>
          <div className="w-full flex flex-col  gap-y-[6px]">
            <span className="sm:text-sm text-base font-normal text-[#FFFFFF]">
              Document number
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
              name="documentNumer"
              control={control}
            />
          </div>
          <div className="w-full flex flex-col gap-y-[6px]">
            <span className="sm:text-sm text-base font-normal text-[--text-body]">
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
            <span className="sm:text-sm text-base font-normal text-[#FFFFFF]">
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
            <label className="sm:text-sm text-base text-[#EFF0F1]">
              Date of birth
            </label>
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
          <div className="w-full flex flex-col gap-y-[7px] mb-2">
            <div className="w-full flex items-center gap-2">
              <span className="sm:text-sm text-base font-normal text-[#FFFFFF]">
                Phone Number
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
                    place="top"
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
                          ? "Invalida"
                          : errors.phone && errors.phone.message}
                      </span>
                    </div>
                  </CustomTooltip>
                </>
              )}
            </div>
            <Controller
              render={({ field: { onChange, value, name } }) => (
                <CustomSelectPhone
                  className="h-[36px]"
                  onChange={onChange}
                  value={value}
                  name={name}
                  onError={(_error) => {
                    console.log(_error);
                  }}
                />
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

      {/* <User
        className="absolute w-96 h-96 -top-7 right-7 rotate-[45deg] opacity-15"
        color="#FFED00"
      /> */}
    </div>
  );
};

export default FormCreateInfo;
