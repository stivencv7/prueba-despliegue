import React from "react";

const IconArrow = ({ className }: { className?: string }) => {
  return (
    <svg
      className={className}
      width="20"
      height="15"
      viewBox="0 0 20 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0.966553"
        y="6.31543"
        width="11.8421"
        height="2.36842"
        rx="0.6"
        fill="#FFED00"
      />
      <path
        d="M17.8416 6.55841C18.4498 7.03886 18.4498 7.96114 17.8416 8.44159L12.7562 12.4594C11.9693 13.0811 10.8123 12.5206 10.8123 11.5178L10.8123 3.4822C10.8123 2.47939 11.9693 1.91894 12.7562 2.54061L17.8416 6.55841Z"
        fill="#FFED00"
      />
    </svg>
  );
};

export default IconArrow;
