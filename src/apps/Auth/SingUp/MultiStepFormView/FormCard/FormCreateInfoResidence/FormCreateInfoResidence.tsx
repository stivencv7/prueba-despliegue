// import React, { useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";
// import { createUserInfoState } from "../../state";
// import { useRecoilState } from "recoil";
// import { Controller, get, useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { ResidentialAddressSchema } from "../../schema/create-schema-auth";
// import CustomInput from "../../../../../Shared/CustomInput/CustomInput";
// import CustomSelectCountries from "../../CustomSelectCountries/CustomSelectCountries";
// // import { FetchHttpClientRepository } from "../../../../../Shared/Http/FetchHttp";

// function FormCreateInfoResidence({
//   onActionTriggered,
// }: {
//   onActionTriggered?: any;
// }) {
//   const [t, i18n] = useTranslation("global");

//   const [userPayload, setUserPayload] = useRecoilState(createUserInfoState);

//   const HttpRepository = new FetchHttpClientRepository();

//   const [countries, setCountries] = useState([]);
//   const [states, setStates] = useState([]);
//   const [city, setCity] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isLoadingState, setIsLoadingState] = useState(false);
//   const [isLoadingCity, setIsLoadingCity] = useState(false);
//   const [selected, setSelected] = useState({
//     country: "",
//     region: "",
//     city: "",
//   });

//   const {
//     handleSubmit,
//     watch,
//     control,
//     formState: { errors, isValid },
//     getValues,
//     setValue,
//     setFocus,
//   } = useForm({
//     resolver: zodResolver(ResidentialAddressSchema),
//     mode: "onChange",
//     reValidateMode: "onChange",
//     defaultValues: {
//       country: "",
//       region: "",
//       city: "",
//       postalCode: "",
//       fullResidence: "",
//     },
//   });

//   const formatCountryForList = (items: any) => {
//     if (!items && !items.length) {
//       return [];
//     }
//     return items?.map((ite?: any) => ({
//       name: ite?.country_name ?? "",
//     }));
//   };

//   const formatStatesForList = (items: any) => {
//     if (!items) {
//       return [];
//     }
//     return items?.map((ite?: any) => ({
//       name: ite?.state_name ?? "",
//     }));
//   };

//   const formatCityForList = (items: any) => {
//     if (!items) {
//       return [];
//     }
//     console.log(items);

//     return items?.map((ite?: any) => ({
//       name: ite?.city_name ?? "",
//     }));
//   };

//   const getCountry = async () => {
//     const params = {
//       Authorization: `Bearer ${userPayload?.auth_token}`,
//       Accept: "application/json",
//     };
//     const response = await HttpRepository.get({
//       url: "/api/countries",
//       baseURL: "https://www.universal-tutorial.com",
//       headers: params,
//     });
//     const data = formatCountryForList(response);
//     setCountries(data);
//     setIsLoading(false);
//   };

//   useEffect(() => {
//     setIsLoading(true);
//     getCountry();
//   }, [userPayload]);

//   const getStates = async () => {
//     const params = {
//       Authorization: `Bearer ${userPayload?.auth_token}`,
//       Accept: "application/json",
//     };
//     try {
//       const response = await HttpRepository.get({
//         url: `/api/states/${getValues("country")}`,
//         baseURL: "https://www.universal-tutorial.com",
//         headers: params,
//       });
//       const data = formatStatesForList(response);
//       setStates(data);
//       setIsLoadingState(false);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     setIsLoadingState(true);
//     getStates();
//   }, [getValues("country")]);

//   const getCity = async () => {
//     const params = {
//       Authorization: `Bearer ${userPayload?.auth_token}`,
//       Accept: "application/json",
//     };
//     try {
//       const response = await HttpRepository.get({
//         url: `/api/cities/${getValues("region")}`,
//         baseURL: "https://www.universal-tutorial.com",
//         headers: params,
//       });
//       const data = formatCityForList(response);
//       setCity(data);
//       setIsLoadingCity(false);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     setIsLoadingCity(true);
//     getCity();
//   }, [getValues("region")]);

//   useEffect(() => {
//     if (userPayload?.country) {
//       setValue("country", userPayload?.country, {
//         shouldValidate: true,
//       });
//     }
//     if (userPayload?.region) {
//       setValue("region", userPayload?.region, {
//         shouldValidate: true,
//       });
//     }
//     if (userPayload?.city) {
//       setValue("city", userPayload?.city, {
//         shouldValidate: true,
//       });
//     }
//     if (userPayload?.postalCode) {
//       setValue("postalCode", userPayload?.postalCode, {
//         shouldValidate: true,
//       });
//     }
//     if (userPayload?.fullResidence) {
//       setValue("fullResidence", userPayload?.fullResidence, {
//         shouldValidate: true,
//       });
//     }
//   }, [userPayload]);

//   const onSubmit = (data: any) => {
//     setUserPayload((currentPayload: any) => {
//       const updatedBenefitPayload = {
//         ...currentPayload,
//         ...data,
//       };

//       console.log(updatedBenefitPayload);
//       return updatedBenefitPayload;
//     });

//     onActionTriggered("next");
//   };

//   return (
//     <div className="w-full h-[450px] p-10 flex jucstify-center items-center relative rounded-[32px]  bg-[--background-dark-blue] shadow-lg">
//       <form
//         onSubmit={handleSubmit((data) => {
//           console.log(data);
//         })}
//         className="z-40 w-full"
//       >
//         <p
//           className="text-base text-[--text-body] mb-4 cursor-pointer"
//           onClick={() => onActionTriggered("previous")}
//         >
//           Back
//         </p>
//         <h2 className="text-[--text-body] text-lg leading-[22.1px] font-bold mb-1">
//           Residential Address
//         </h2>
//         <p className="text-base text-[--text-body] mb-4">
//           Please indicate your current residential address
//         </p>
//         <div className="w-full grid grid-cols-2 gap-x-7 gap-y-4 mb-5 ">
//           <div className="w-full flex flex-col  col-span-2 gap-y-[5px]">
//             <span className="text-base font-normal text-[--text-body]">
//               Recidence Country
//             </span>
//             <Controller
//               render={({ field: { onChange, value, name } }) => (
//                 <CustomSelectCountries
//                   data={countries}
//                   name={name}
//                   value={value}
//                   onChange={onChange}
//                   getValues={getValues("country")?.toLowerCase()}
//                   onValue={(_value) => {
//                     console.log(_value);
//                     setValue("country", _value, {
//                       shouldValidate: true,
//                     });
//                   }}
//                   placeholder="Search for countries"
//                   isLoading={isLoading}
//                   selected={selected.country}
//                   setSelected={setSelected}
//                 />
//               )}
//               name="country"
//               control={control}
//             />
//             {/* <span className="text-red-600 mt-2 text-sm">
//               {errors?.phone && errors?.phone?.message}
//             </span> */}
//           </div>
//           <div className="w-full flex flex-col gap-y-[5px]">
//             <span className="text-base font-normal text-[--text-body]">
//               Region
//             </span>
//             <Controller
//               render={({ field: { onChange, value, name } }) => (
//                 <CustomSelectCountries
//                   data={states}
//                   name={name}
//                   value={value}
//                   onChange={onChange}
//                   getValues={getValues("region")?.toLowerCase()}
//                   onValue={(_value) =>
//                     setValue("region", _value, {
//                       shouldValidate: true,
//                     })
//                   }
//                   placeholder="Search for region"
//                   isLoading={isLoadingState}
//                   disabled={selected.country.length > 0 ? false : true}
//                   selected={selected.region}
//                   setSelected={setSelected}
//                 />
//               )}
//               name="region"
//               control={control}
//             />
//             {/* <span className="text-red-600 mt-2 text-sm">
//               {errors?.phone && errors?.phone?.message}
//             </span> */}
//           </div>
//           <div className="w-full flex flex-col gap-y-[5px]">
//             <span className="text-base font-normal text-[--text-body]">
//               City
//             </span>
//             <Controller
//               render={({ field: { onChange, value, name } }) => (
//                 <CustomSelectCountries
//                   data={city}
//                   name={name}
//                   value={value}
//                   onChange={onChange}
//                   getValues={getValues("city")?.toLowerCase()}
//                   onValue={(_value) =>
//                     setValue("city", _value, {
//                       shouldValidate: true,
//                     })
//                   }
//                   placeholder="Search for city"
//                   disabled={selected.region.length > 0 ? false : true}
//                   selected={selected.city}
//                   setSelected={setSelected}
//                   isLoading={isLoadingCity}
//                 />
//               )}
//               name="city"
//               control={control}
//             />
//             {/* <span className="text-red-600 mt-2 text-sm">
//               {errors?.phone && errors?.phone?.message}
//             </span> */}
//           </div>
//           <div className="w-full flex flex-col gap-y-[5px]">
//             <span className="text-base font-normal text-[--text-body]">
//               Postal Code
//             </span>
//             <Controller
//               render={({ field: { onChange, value, name } }) => (
//                 <CustomInput
//                   type="text"
//                   value={value}
//                   onChange={onChange}
//                   className="w-full h-[36px] rounded-[10px] bg-[--dark-gray] text-[--text-body] p-[8px] pr-[36px] outline-none focus:outline-none placeholder:text-[#A1A1A1] "
//                   name={name}
//                   error={Boolean(errors["postalCode"])}
//                   helperText={
//                     errors["postalCode"] ? errors["postalCode"].message : ""
//                   }
//                   placeholder="Type code"
//                 />
//               )}
//               name="postalCode"
//               control={control}
//             />
//           </div>
//           <div className="w-full flex flex-col gap-y-[5px]">
//             <span className="text-sm sm:text-base font-normal text-[--text-body]">
//               Full Residence Address
//             </span>
//             <Controller
//               render={({ field: { onChange, value, name } }) => (
//                 <CustomInput
//                   type="text"
//                   value={value}
//                   onChange={onChange}
//                   className="w-full h-[36px] rounded-[10px] bg-[--dark-gray] text-[--text-body] p-[8px] pr-[36px] outline-none focus:outline-none placeholder:text-[#A1A1A1] "
//                   name={name}
//                   error={Boolean(errors["fullResidence"])}
//                   helperText={
//                     errors["fullResidence"]
//                       ? errors["fullResidence"].message
//                       : ""
//                   }
//                   placeholder="Type full Address"
//                 />
//               )}
//               name="fullResidence"
//               control={control}
//             />
//           </div>
//         </div>
//         <button
//           type="submit"
//           className={`flex justify-center items-center gap-x-2 w-full h-[40px] bg-[--yellow] disabled:bg-[--yellow-disabled] rounded-[60px] text-base font-bold leading-[20.8px] text-[--background-dark-blue]`}
//           onClick={handleSubmit(onSubmit)}
//           disabled={!isValid}
//         >
//           Continuar
//         </button>
//       </form>
//     </div>
//   );
// }

// export default FormCreateInfoResidence;
