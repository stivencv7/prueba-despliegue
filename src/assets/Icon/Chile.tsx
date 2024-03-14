import React from "react";

const Chile = ({ className }: { className?: any }) => {
  return (
    <svg
      viewBox="0 0 36 36"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      aria-hidden="true"
      role="img"
      // class="iconify iconify--twemoji"
      preserveAspectRatio="xMidYMid meet"
      fill="#000000"
      className={`iconify iconify--twemoji ${className}`}
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          fill="#1F429B"
          d="M13 5H4a4 4 0 0 0-4 4v9h13V5zm-4.663 9.292l-1.882-1.367l-1.882 1.367l.719-2.212l-1.882-1.368h2.326L6.455 8.5l.719 2.212H9.5L7.618 12.08l.719 2.212z"
        ></path>
        <path fill="#EEE" d="M32 5H13v13h23V9a4 4 0 0 0-4-4z"></path>
        <path
          fill="#D42D27"
          d="M0 18v9a4 4 0 0 0 4 4h28a4 4 0 0 0 4-4v-9H0z"
        ></path>
        <path
          fill="#FFF"
          d="M7.174 10.712L6.455 8.5l-.719 2.212H3.41l1.882 1.368l-.719 2.212l1.882-1.367l1.882 1.367l-.719-2.212L9.5 10.712z"
        ></path>
      </g>
    </svg>
  );
};

export default Chile;
