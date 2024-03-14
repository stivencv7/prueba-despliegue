import React from "react";

export const Rounded = ({
  fill,
  className,
}: {
  fill?: string;
  className?: string;
}) => {
  return (
    <div>
      <svg
        className={className}
        width="85"
        height="83"
        viewBox="0 0 85 83"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 83V0.5H84.5V25H62C44.3269 25 30 39.3269 30 57V83H0Z"
          fill={fill}
        />
      </svg>
    </div>
  );
};
// fill="#191E25"
