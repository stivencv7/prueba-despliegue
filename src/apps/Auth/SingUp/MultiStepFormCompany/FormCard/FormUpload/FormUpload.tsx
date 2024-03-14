import { Controller, useForm } from "react-hook-form";
import { DropZone } from "../../../../../Shared/DropZone/DropZone";
import "./FormUpload.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InfoIcon from "@/assets/Icon/InfoIcon";
import CustomTooltip from "@/apps/Shared/CustomTooltip/CustomTooltip";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const schema = z.object({
  image: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
  image2: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
});

const FormUpload = ({ onActionTriggered }) => {
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    setValue,
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
    // reValidateMode: "onChange",
    defaultValues: {
      image: "",
      image2: "",
    },
  });

  return (
    <div className="w-full h-full p-8 flex justify-center rounded-[32px]  bg-[--background-dark-blue] shadow-lg transition-all duration-300">
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
        className="z-40 w-full overflow-hidden"
      >
        <p
          className="text-base text-[--text-body] mb-3 cursor-pointer w-[70px]"
          onClick={() => onActionTriggered("previous")}
        >
          Back
        </p>
        <h2 className="text-[--text-body] text-lg leading-[22.1px] font-bold mb-1">
          Company Information
        </h2>
        <p className="text-base text-[--text-body] mb-3">
          Please insert the following information .
        </p>
        <div className="flex flex-col justify-between gap-7 2xl:gap-7 w-full mb-5 2xl:mb-10">
          <div className="flex flex-col  gap-2 w-full text-white ">
            <div className="w-full flex items-center gap-2">
              <label htmlFor="" className="text-left text-[15px]">
                Upload NIF or RUT document
              </label>
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
                    How to find your Company´s formation document ?
                  </h2>
                  <ul className="list-disc flex flex-col items-center justify-center space-y-2">
                    <li className="list-color">
                      In the US, companies are typically registered at the state
                      level. You can search the website of the Secretary of
                      State for the state where your company is registered. Many
                      states allow you to search by business name for a fee.
                    </li>
                  </ul>
                </div>
              </CustomTooltip>
            </div>
            <Controller
              render={({}) => (
                <DropZone
                  className="upload"
                  setFile={(value) => {
                    setValue("image", value, {
                      shouldValidate: true,
                    });
                  }}
                />
              )}
              name="image"
              control={control}
            />
          </div>
          <div className="flex flex-col gap-2 w-full text-white ">
            <div className="w-full flex items-center gap-2">
              <label htmlFor="" className="text-left text-[15px]">
                Upload formation document{" "}
              </label>
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
                    How to find your Company´s formation document ?
                  </h2>
                  <ul className="list-disc flex flex-col items-center justify-center space-y-2">
                    <li className="list-color">
                      In the US, companies are typically registered at the state
                      level. You can search the website of the Secretary of
                      State for the state where your company is registered. Many
                      states allow you to search by business name for a fee.
                    </li>
                  </ul>
                </div>
              </CustomTooltip>
            </div>
            <Controller
              render={({}) => (
                <DropZone
                  className="upload"
                  setFile={(value) => {
                    setValue("image2", value, {
                      shouldValidate: true,
                    });
                  }}
                />
              )}
              name="image2"
              control={control}
            />
          </div>
        </div>
        <button
          type="submit"
          className={`flex justify-center items-center gap-x-2 w-full h-[40px] bg-[--yellow] disabled:bg-[--yellow-disabled] rounded-[60px] text-base font-bold leading-[20.8px] text-[--background-dark-blue]`}
          //   onClick={handleSubmit(onSubmit)}
          disabled={!isValid}
        >
          Continuar
        </button>
      </form>
    </div>
  );
};

export default FormUpload;
