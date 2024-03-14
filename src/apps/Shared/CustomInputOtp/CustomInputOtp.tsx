import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface CustomInputOtpProps {
  className?: string;
  length: number;
  otp: string[];
  setOtp: (otp: string[]) => void;
  fieldValidity: boolean[];
  setFieldValidity: (fieldValidity: boolean[]) => void;
}

const CustomInputOtp = ({
  className,
  length,
  otp,
  setOtp,
  fieldValidity,
  setFieldValidity,
}: CustomInputOtpProps) => {
  const inputRefs = useRef<any>([]);

  useEffect(() => {
    inputRefs.current[0].focus();
  }, []);

  const _className = `w-full flex justify-between items-center py-1 px-1 ${className}`;

  const handleChange = (index?: any, e?: any) => {
    const value = e.target.value;
    if (isNaN(value)) return false;
    const newOtp = [...otp];

    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // submit trigger
    // const combineOtp = newOtp.join("");
    // if (combineOtp.length === length) onOtpSubmit(combineOtp);

    if (value && index < length - 1 && inputRefs?.current[index + 1]) {
      inputRefs?.current[index + 1].focus();
    }
    const newFieldValidity = [...fieldValidity];
    newFieldValidity[index] = true;
    setFieldValidity(newFieldValidity);
  };

  const handleClick = (index?: any) => {
    inputRefs.current[index].setSelectionRange(1, 1);
    const newFieldValidity = new Array(length).fill(true);
    setFieldValidity(newFieldValidity);
    // optional
    if (index > 0 && !otp[index - 1]) {
      inputRefs.current[otp.indexOf("")].focus();
    }
  };

  const handleKeyDown = (index?: any, e?: any) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("Text");
    // Filtra solo los números de la cadena pegada
    const pastedValues = pastedData.split("").filter((char) => !isNaN(char));

    // Limita la cantidad de números pegados a la longitud del OTP
    const valuesToSet = pastedValues.slice(0, length);

    if (pastedValues) {
      const newOtp = [...otp];
      valuesToSet.forEach((value, index) => {
        if (index < length) {
          newOtp[index] = value;
        }
      });

      setOtp(newOtp);
    }
  };

  return (
    <div className={_className}>
      {otp.map((value, i) => {
        return (
          <motion.input
            key={i}
            type="text"
            ref={(input) => (inputRefs.current[i] = input)}
            value={value}
            name="otp"
            onChange={(e) => handleChange(i, e)}
            onClick={() => handleClick(i)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            className={`w-[54px] h-[54px] rounded-[10px] bg-[#3E4347] text-center outline-none text-[--text-body] text-xl font-bold cursor-pointer ${
              !fieldValidity[i] && "border-2 border-red-600"
            }  focus:border-2 focus:border-[#E5D714]`}
            maxLength={1}
            whileHover={{ scale: 1.05 }}
            whileFocus={{ scale: 1.05 }}
            onPaste={handlePaste}
          />
        );
      })}
    </div>
  );
};

export default CustomInputOtp;
