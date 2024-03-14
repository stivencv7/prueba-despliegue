import React from "react";

const Search = ({ className }: { className?: any }) => {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M10.1885 10.1995L13.875 13.875M11.75 6.4375C11.75 9.37149 9.37149 11.75 6.4375 11.75C3.50348 11.75 1.125 9.37149 1.125 6.4375C1.125 3.50348 3.50348 1.125 6.4375 1.125C9.37149 1.125 11.75 3.50348 11.75 6.4375Z"
        stroke="#B8B8B8"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default Search;
