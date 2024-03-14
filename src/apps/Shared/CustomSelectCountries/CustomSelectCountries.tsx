import React, { useEffect, useRef, useState } from "react";
import "./CustomSelectCountries.css";
import { useRecoilState } from "recoil";
import { createUserInfoState } from "../../Auth/SingUp/MultiStepFormPerson/state";
import Polygon from "../../../assets/Icon/Polygon";
import Search from "../../../assets/Icon/Search";
import "./CustomSelectCountries.css";

const CustomSelectCountries = ({
  data,
  name,
  value,
  onChange,
  getValues,
  onValue,
  placeholder,
  isLoading,
  disabled,
  selected,
  setSelected,
}: {
  data: any;
  name: string;
  value: string;
  onChange: (value: any) => void;
  getValues: string;
  onValue: (country: string) => void;
  placeholder: string;
  isLoading: boolean;
  disabled?: boolean;
  selected?: any;
  setSelected?: any;
}) => {
  const [isFocus, setIsFocus] = useState(false);
  // const [selected, setSelected] = useState("");
  const divRef = useRef<any>(null);
  const [userPayload, setUserPayload] = useRecoilState(createUserInfoState);

  useEffect(() => {
    function handleClickOutside(event?: any) {
      if (divRef.current && !divRef.current.contains(event.target)) {
        // console.log(selected?.length);

        // if (!selected.length) {
        //   onChange("");
        // }
        setIsFocus(false);
        return;
      }
    }

    // Agregar el evento de clic al documento
    document.addEventListener("click", handleClickOutside);
    // Limpiar el evento cuando el componente se desmonte
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="w-full h-[36px] rounded-[10px] bg-[--dark-gray] relative focus:border-2 "
      ref={divRef}
      // onBlur={() => setIsFocus(false)}
    >
      <Search className="absolute inset-y-0 right-8 h-full" />
      <Polygon
        className={`absolute inset-y-0 right-3 h-full transition-all duration-700 ${
          isFocus ? "rotate-180" : "rotate-0"
        } `}
      />
      <input
        type="text"
        name={name}
        value={value?.toLowerCase()}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full h-full outline-none p-[8px] pr-[50px] bg-transparent rounded-[10px] text-[--text-body] text-base focus:border-[1.5px] focus:border-[--yellow]"
        onFocus={() => setIsFocus(true)}
        autoComplete="off"
        disabled={disabled}
      />
      <ul
        className={`select bg-[--dark-gray] w-full mt-2 px-2 overflow-y-auto rounded-[10px] absolute z-50 transition-all duration-300 space-y-2 ${
          isFocus ? "max-h-60 py-2 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {data?.map((countriy?: any) => (
          <li
            key={countriy?.name}
            className={`p-3 text-sm hover:bg-[--background-dark-blue] text-[--text-body] rounded-[10px]  cursor-pointer  transition-colors duration-300
                        ${
                          countriy?.name?.toLowerCase() ===
                            selected.toLowerCase() &&
                          "bg-[--background-dark-blue] text-[--text-body] rounded-[10px]"
                        }
                        ${
                          countriy?.name?.toLowerCase().startsWith(getValues)
                            ? "block"
                            : "hidden"
                        }`}
            onClick={() => {
              setIsFocus(false);
              setSelected((sele?: any) => ({
                ...sele,
                [name]: countriy?.name,
              }));
              // setSelected(countriy?.name);
              onValue(countriy?.name);
            }}
          >
            {countriy?.name}
          </li>
        ))}
        {isLoading ? (
          <p className="text-[--text-body] text-center">Cargando...</p>
        ) : (
          !data && <p className="text-[--text-body] text-center">sin data</p>
        )}
      </ul>
    </div>
  );
};

export default CustomSelectCountries;
