import { useEffect, useRef, useState } from "react";

import {
  getCountries,
  getCountryCallingCode,
  isPossiblePhoneNumber,
  isValidPhoneNumber,
} from "react-phone-number-input/input";
import en from "react-phone-number-input/locale/en";

import "./CustomSelectPhone.css";
import { FlagIcon } from "react-flag-kit";

const CustomSelectPhone = ({
  className,
  onChange,
  value,
  name,
  isvisible,
  onError,
}: {
  className?: string;
  onChange?: any;
  value?: any;
  name?: any;
  isvisible?: any;
  onError?: any;
}) => {
  const [isFocus, setIsFocus] = useState(false);
  const [selected, setSelected] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [inputValue, setInputValue] = useState("");
  const [inputSearch, setInputSearch] = useState("");

  const divRef = useRef<any>(null);
  // const [userPayload, setUserPayload] = useRecoilState(createUserInfoState);

  useEffect(() => {
    function handleClickOutside(event?: any) {
      if (divRef.current && !divRef.current.contains(event.target)) {
        // console.log(selected?.length);

        // if (!selected.length) {
        //   onChange("");
        // }
        setInputSearch("");
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

  useEffect(() => {
    if (!isvisible) {
      setSelected("");
      setSelectedCountry("");
      setInputValue("");
      const eventoPersonalizado = new CustomEvent("error", {
        detail: false,
      });
      document.dispatchEvent(eventoPersonalizado);
    }
  }, [isvisible]);

  useEffect(() => {
    const eventoPersonalizado = new CustomEvent("error", {
      detail:
        inputValue &&
        isValidPhoneNumber(`${selected + inputValue}`, selectedCountry as any)
          ? false
          : inputValue && true,
    });
    document.dispatchEvent(eventoPersonalizado);
  }, [inputValue]);

  const _className =
    `${className} w-full rounded-[10px] bg-transparent relative focus:border-2` ??
    "";

  const filteredCountries = getCountries().filter((country) =>
    en[country]?.toLowerCase().startsWith(inputSearch.toLowerCase())
  );

  // Ordenamos la lista de países con el país seleccionado primero
  const sortedCountries = selectedCountry
    ? [
        selectedCountry,
        ...getCountries().filter((country) => country !== selectedCountry),
      ]
    : getCountries();

  return (
    <div
      className={_className}
      ref={divRef}
      // onBlur={() => setIsFocus(false)}
    >
      <div className="flex h-full  w-full gap-2">
        <div
          className="inline-flex relative items-center justify-center gap-2 w-[20%] h-full p-2.5 text-base font-medium text-center border-[--text-light-body] bg-[--dark-gray] text-[--text-body] rounded-lg cursor-pointer"
          onClick={() => setIsFocus(true)}
        >
          <span className="opacity-70">{selected ? selected : "+00"}</span>
        </div>
        <input
          type="text"
          name={name}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setInputValue(e.target.value);
          }}
          className={`w-full h-full outline-none p-[8px] pr-[42px] bg-[--dark-gray] rounded-[10px] text-[--text-body] text-base ${
            isValidPhoneNumber(`${selected + inputValue}`, selectedCountry as any)
              ? inputValue && "focus:border-[1.5px] focus:border-[#FFED00]"
              : inputValue && "border-[1.5px] border-[#984D4D]"
          } `}
          autoComplete="off"
          placeholder="000-000-000"
          required
          disabled={isFocus || !selected}
        />
      </div>

      <ul
        className={`select  bg-[--dark-gray] w-full mt-2 px-2  rounded-[10px] absolute z-50 transition-all duration-300 space-y-2 overflow-y-auto ${
          isFocus ? "max-h-64 pb-2  opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <input
          type="text"
          name={name}
          value={inputSearch}
          onChange={(e) => {
            setInputSearch(e.target.value);
          }}
          className="sticky top-0 w-full h-full outline-none py-3 px-1 pr-[42px] bg-[--dark-gray]  text-[--text-body] text-base border-b "
          autoComplete="off"
          placeholder="Search country . . ."
        />
        {sortedCountries?.map((country, index) => (
          <li
            key={index}
            value={country}
            className={`flex items-center gap-3 p-3 text-sm hover:bg-[--background-dark-blue] text-[--text-body] rounded-[10px]  cursor-pointer  transition-colors duration-300 
              ${
                country === selectedCountry &&
                "bg-[--background-dark-blue] text-[--text-body] rounded-[10px]"
              }
              ${
                en[country]?.toLowerCase().startsWith(inputSearch)
                  ? "block"
                  : "hidden"
              }`}
            onClick={() => {
              setIsFocus(false);
              setSelectedCountry(country);
              setSelected(`+${getCountryCallingCode(country as any)}`);
              setInputSearch("");
            }}
          >
            <FlagIcon code={country as any} className="rounded-sm" />
            {en[country]} +{getCountryCallingCode(country as any)}
          </li>
        ))}
        {filteredCountries?.length === 0 && (
          <li className="flex items-center gap-3 p-3 text-sm text-[--text-body]  cursor-pointer  transition-colors duration-300">
            No se encontraron resultados...
          </li>
        )}
      </ul>
    </div>
  );
};

export default CustomSelectPhone;
