import React from "react";
import { Tooltip, PlacesType } from "react-tooltip";

const CustomTooltip = ({
  id,
  anchorSelect,
  place,
  className,
  style,
  children,
  content,
}: {
  id?: string;
  anchorSelect?: string;
  place?: PlacesType;
  className?: string;
  style?: any;
  children?: any;
  content?: string;
}) => {
  return (
    <Tooltip
      id={id}
      place={place}
      className={className}
      style={style}
      content={content}
      anchorSelect={anchorSelect}
    >
      {children}
    </Tooltip>
  );
};

export default CustomTooltip;
