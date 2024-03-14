import React from "react";

const IconLindkWithdraw = ({
  className,
  fill,
  onMouseEnter,
  onMouseLeave,
}: {
  className?: string;
  fill?: string;
  onMouseEnter?: any;
  onMouseLeave?: any;
}) => {
  return (
    <svg
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={className}
      width="34"
      height="35"
      viewBox="0 0 34 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        y="34.333"
        width="34"
        height="34"
        rx="17"
        transform="rotate(-90 0 34.333)"
        fill={fill}
      />
      <path
        d="M14 10.833L14 23.833L10 21.3955"
        stroke="#EFF0F1"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M21 23.833L21 10.833L24 13.2705"
        stroke="#EFF0F1"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default IconLindkWithdraw;
