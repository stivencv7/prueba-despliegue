import VisibleOff from "../../../assets/Icon/VisibleOff";
import Visibility from "../../../assets/Icon/Visibility";
import XIcon from "../../../assets/Icon/XIcon";
import Check from "../../../assets/Icon/Check";
import CustomTooltip from "../CustomTooltip/CustomTooltip";

interface CustomInputProps {
  className?: string;
  type?: string;
  value?: string;
  name?: string;
  onChange?: (event: any) => void;
  error?: boolean;
  helperText?: string;
  showPassword?: boolean;
  togglePasswordVisibility?: any;
  [key: string]: any; // Propiedades adicionales opcionales
}

const CustomInput = ({
  className,
  type,
  value,
  name,
  onChange,
  error,
  helperText,
  showPassword,
  togglePasswordVisibility,
  ...rest
}: CustomInputProps) => {
  const styleInput = error
    ? `${className} border-[1.5px] border-[#984D4D]`
    : `${className} focus:border-[1.5px] focus:border-[#FFED00]`;

  return (
    <div className="w-full z-30 relative">
      <input
        type={showPassword ? "text" : type}
        value={value}
        onChange={onChange}
        className={styleInput}
        {...rest}
      />
      <div
        className={`absolute inset-y-0 ${
          type === "password" ? " mr-3 w-[42px] right-0" : "right-3 "
        }  flex items-center cursor-pointer  z-30 h-full group`}
        onClick={() => type === "password" && togglePasswordVisibility()}
      >
        <div className="relative flex items-center w-full h-full gap-1">
          {/* {error && value && (
            <div
              className={`min-w-max invisible group-hover:visible opacity-0 group-hover:opacity-100 transition  bg-[#3E4347] border-2 border-[#9E6E6E] text-white p-2 rounded absolute bottom-[39px] ${
                type === "password" ? "mr-[33px]" : "mr-[13px]"
              }`}
            >
              {helperText}
              <div
                id="arrow"
                className="max-w-max invisible group-hover:visible opacity-0 group-hover:opacity-100 absolute h-3 w-3  left-1/2  transform -translate-x-1/2 top-[35px] rounded before:rounded-sm before:border-b-2 before:border-r-2 before:border-[#9E6E6E] bg-inherit before:visible before:absolute before:h-3 before:w-3 before:rotate-45 before:bg-inherit before:content-['']"
                data-popper-arrow
              />
            </div>
          )} */}
          <CustomTooltip
            anchorSelect={`#${name}`}
            place="bottom"
            className="absolute"
            content={helperText}
          />
          {type === "password" &&
            (error || value) &&
            value &&
            (error && value ? (
              <XIcon className="w-[24px] h-[24px]" id={name} />
            ) : (
              value && <Check className="w-[24px] h-[24px]" />
            ))}
          {(error || value) &&
            value &&
            (type === "password" && value ? (
              showPassword ? (
                <VisibleOff className="w-[24px] h-[24px]" />
              ) : (
                <Visibility className="w-[22px] h-[22px]" />
              )
            ) : error ? (
              <XIcon className="w-[24px] h-[24px]" id={name} />
            ) : (
              value && <Check className="w-[24px] h-[24px]" />
            ))}
        </div>
      </div>
      {/* <span>{helperText}</span> */}
    </div>
  );
};

export default CustomInput;
