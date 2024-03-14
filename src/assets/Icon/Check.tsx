import React from "react";

const Check = ({ className }: { className?: string }) => {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M7.4375 10.9375L9.1875 12.6875L13.5625 8.3125"
        stroke="#D6CA5C"
        stroke-width="1.4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M6.125 2.92059C7.41201 2.1761 8.90627 1.75 10.5 1.75C15.3324 1.75 19.25 5.66751 19.25 10.5C19.25 15.3324 15.3324 19.25 10.5 19.25C5.66751 19.25 1.75 15.3324 1.75 10.5C1.75 8.90627 2.1761 7.41201 2.92059 6.125"
        stroke="#D6CA5C"
        stroke-width="1.4"
        stroke-linecap="round"
      />
    </svg>
  );
};

export default Check;
