import React from "react";

// Componente de imagen personalizado
const CustomImage = ({ src, alt, className, onclick, ...rest }) => {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onClick={onclick}
      {...rest}
    />
  );
};

export default CustomImage;
