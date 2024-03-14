import React from "react";

const Polygon = ({ className }: { className?: any }) => {
  return (
    <svg
      width="13"
      height="9"
      viewBox="0 0 13 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M7.33224 8.50072C6.93646 9.09483 6.06354 9.09483 5.66776 8.50072L1.04032 1.55442C0.597597 0.88984 1.07402 -1.76351e-07 1.87256 -1.0654e-07L11.1274 7.02547e-07C11.926 7.72358e-07 12.4024 0.88984 11.9597 1.55442L7.33224 8.50072Z"
        fill="#EFF0F1"
      />
    </svg>
  );
};

export default Polygon;
