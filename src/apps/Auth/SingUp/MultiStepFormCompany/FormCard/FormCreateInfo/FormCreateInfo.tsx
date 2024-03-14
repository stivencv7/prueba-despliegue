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
import CustomSelectCountries from "@/apps/Shared/CustomSelectCountries/CustomSelectCountries";
import InfoIcon from "@/assets/Icon/InfoIcon";
import CustomTooltip from "@/apps/Shared/CustomTooltip/CustomTooltip";

const FormCreateInfo = ({ onActionTriggered }: { onActionTriggered?: any }) => {
  const [t, i18n] = useTranslation("global");

  const [userPayload, setUserPayload] = useRecoilState(createUserInfoState);
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [selected, setSelected] = useState({
    country: "",
  });

  // const [phone, setPhone] = useState([
  //   {
  //     country: "Colombia",
  //     calling_code: 57,
  //     icon: <Colombia className="w-4 h-4" />,
  //   },
  //   {
  //     country: "Peru",
  //     calling_code: 51,
  //     icon: <Peru className="w-4 h-4" />,
  //   },
  //   {
  //     country: "Chile",
  //     calling_code: 56,
  //     icon: <Chile className="w-4 h-4" />,
  //   },
  //   {
  //     country: "United States",
  //     calling_code: 1,
  //     icon: <UnitedStates className="w-4 h-4" />,
  //   },
  // ]);

  const {
    handleSubmit,
    watch,
    control,
    formState: { errors, isValid },
    getValues,
    setValue,
  } = useForm({
    resolver: zodResolver(infoSchema),
    mode: "onChange",
    // reValidateMode: "onChange",
    defaultValues: {
      country: "",
      legalName: "",
      companyType: "",
      taxId: "",
      legalAddress: "",
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
  }, []);

  watch();

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
    <div className="w-full h-full p-8 flex justify-center rounded-[32px]  bg-[--background-dark-blue] shadow-lg transition-all duration-300">
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
        className="z-40 w-full"
      >
        <p
          className="text-base text-[--text-body] mb-4 cursor-pointer w-[70px]"
          onClick={() => onActionTriggered("previous")}
        >
          Back
        </p>
        <h2 className="text-[--text-body] text-lg leading-[22.1px] font-bold mb-1">
          Company Information
        </h2>
        <p className="text-base text-[--text-body] mb-5">
          Please insert the following information .
        </p>
        <div className="w-full grid grid-cols-2 gap-x-7 gap-y-3 2xl:gap-y-5 mb-8">
          <div className="w-full flex flex-col  col-span-2 gap-y-[6px]">
            <span className="text-sm sm:text-base font-normal text-[#FFFFFF]">
              Registration Country
            </span>
            <Controller
              render={({ field: { onChange, name } }) => (
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
            <span className="text-sm sm:text-base font-normal text-[#FFFFFF]">
              Legal Name
            </span>
            <Controller
              render={({ field: { onChange, value, name } }) => (
                <CustomInput
                  type="text"
                  value={value}
                  onChange={onChange}
                  className="w-full h-[36px] rounded-[10px] bg-[--dark-gray] text-[--text-body] p-[8px] pr-[36px] outline-none focus:outline-none placeholder:text-[#A1A1A1] text-sm"
                  name={name}
                  error={Boolean(errors["legalName"])}
                  helperText={
                    errors["legalName"] ? errors["legalName"].message : ""
                  }
                  placeholder="Enter legal Name"
                />
              )}
              name="legalName"
              control={control}
            />
          </div>
          <div className="w-full flex flex-col  gap-y-[6px]">
            <span className="text-sm sm:text-base font-normal text-[#FFFFFF]">
              Company type
            </span>
            <Controller
              render={({ field: { onChange, value, name } }) => (
                <CustomSelectCountries
                  data={[
                    { name: "Corporation" },
                    { name: "Limited Liability Company(LLC)" },
                    { name: "Public Limited Company(PLC)" },
                    { name: "Limited Partnership(LM)" },
                    { name: "Cooperative" },
                    // Puedes añadir más tipos de documentos según sea necesario
                  ]}
                  name={name}
                  value={value}
                  onChange={onChange}
                  getValues={getValues("companyType")?.toLowerCase()}
                  onValue={(_value) =>
                    setValue("companyType", _value, {
                      shouldValidate: true,
                    })
                  }
                  placeholder="Search for data"
                  isLoading={isLoading}
                  selected={selected.country}
                  setSelected={setSelected}
                />
              )}
              name="companyType"
              control={control}
            />
          </div>
          <div className="w-full flex flex-col gap-y-[6px]">
            <div className="w-full flex items-center gap-2">
              <span className="text-sm sm:text-base font-normal text-[--text-body]">
                tax ID
              </span>
              <InfoIcon
                id="my-anchor-element"
                className="cursor-pointer w-[18px]"
                fill="#B8B8B8"
              />
              <CustomTooltip
                anchorSelect="#my-anchor-element"
                place="top"
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
                  <h2 className="mb-2 text-base font-bold">
                    What is a Tax ID?
                  </h2>
                  <ul className="list-disc flex flex-col items-center justify-center space-y-2">
                    <li className="list-color">
                      A Tax Identification Number (TIN), also known as a
                      Taxpayer Identification Number (TIN), is a unique set of
                      numbers used to identify individuals, corporations, and
                      other entities for tax purposes. In the United States
                    </li>
                  </ul>
                </div>
              </CustomTooltip>
            </div>
            <Controller
              render={({ field: { onChange, value, name } }) => (
                <CustomInput
                  type="text"
                  value={value}
                  onChange={onChange}
                  className="w-full h-[36px] rounded-[10px] bg-[--dark-gray] text-[--text-body] p-[8px] pr-[36px] outline-none focus:outline-none placeholder:text-[#A1A1A1] text-sm"
                  name={name}
                  error={Boolean(errors["taxId"])}
                  helperText={errors["taxId"] ? errors["taxId"].message : ""}
                  placeholder="Enter tax Id"
                />
              )}
              name="taxId"
              control={control}
            />
          </div>
          <div className="w-full flex flex-col gap-y-[7px]">
            <span className="text-sm sm:text-base font-normal text-[#FFFFFF]">
              Legal Address
            </span>
            <Controller
              render={({ field: { onChange, value, name } }) => (
                <CustomInput
                  type="text"
                  value={value}
                  onChange={onChange}
                  className="w-full h-[36px] rounded-[10px] bg-[--dark-gray] text-[--text-body] p-[8px] pr-[36px] outline-none focus:outline-none placeholder:text-[#A1A1A1] text-sm"
                  name={name}
                  error={Boolean(errors["legalAddress"])}
                  helperText={
                    errors["legalAddress"] ? errors["legalAddress"].message : ""
                  }
                  placeholder="Enter legal Address"
                />
              )}
              name="legalAddress"
              control={control}
            />
          </div>
          {/* <div className="w-full flex flex-col gap-y-[7px]">
            <span className="sm:text-sm text-base font-normal text-[#FFFFFF]">
              Phone Number
            </span>
            <Controller
              render={({ field: { onChange, value, name } }) => (
                <CustomSelectPhone
                  onChange={onChange}
                  value={value}
                  name={name}
                />
              )}
              name="phone"
              control={control}
            />
          </div> */}
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
