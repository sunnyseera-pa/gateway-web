import React from "react";

const getViewBox = name => {
  switch (name) {
    case "projecticon":
      return "0 0 20 24";
    case "searchicon":
      return "0 0 18 18";
    case "toolicon":
      return "0 0 18 18";
    default:
      return "0 0 18 18";
  }
};

const getPath = (name, props) => {
  switch (name) {
    case "projecticon":
      return (
        <path
          {...props}
          d="M20,0 L20,17.4142136 L13.4142136,24 L0,24 L0,0 L20,0 Z M18,2 L2,2 L2,22 L12,22 L12,16 L18,16 L18,2 Z M10,16 L10,18 L4,18 L4,16 L10,16 Z M16,11 L16,13 L4,13 L4,11 L16,11 Z M16,6 L16,8 L4,8 L4,6 L16,6 Z"
        />
      );
    case "searchicon":
      return (
        <path
          {...props}
          d="M12.5,11 L11.71,11 L11.43,10.73 C12.41,9.59 13,8.11 13,6.5 C13,2.91 10.09,0 6.5,0 C2.91,0 0,2.91 0,6.5 C0,10.09 2.91,13 6.5,13 C8.11,13 9.59,12.41 10.73,11.43 L11,11.71 L11,12.5 L16,17.49 L17.49,16 L12.5,11 Z M6.5,11 C4.01,11 2,8.99 2,6.5 C2,4.01 4.01,2 6.5,2 C8.99,2 11,4.01 11,6.5 C11,8.99 8.99,11 6.5,11 Z"
        />
      );
    case "toolicon":
      return (
        <path
          {...props}
          d="M14.8554416,5.82520191 L12.1601058,3.13664718 L14.8554416,0.448092455 C14.2939133,0.112023114 13.6200794,0 12.9462454,0 C10.138604,0 7.89249089,2.24046227 7.89249089,5.04104012 C7.89249089,5.60115568 8.00479655,6.04924814 8.1171022,6.60936371 L0.704928853,12.0984963 C-0.193516401,12.770635 -0.193516401,14.0028892 0.48031754,14.787051 L3.06334765,17.4756057 C3.84948724,18.2597675 5.08484947,18.1477444 5.75868341,17.2515595 L11.2616606,9.858034 C11.8231889,9.97005712 12.3847172,10.0820802 12.9462454,10.0820802 C15.7538869,10.0820802 18,7.84161796 18,5.04104012 C18,4.36890143 17.8876943,3.69676275 17.663083,3.13664718 L14.8554416,5.82520191 Z"
        />
      );
    default:
      return <path />;
  }
};

const SVGIcon = ({
  name = "",
  style = {},
  fill = "#000",
  viewBox = "",
  width = "100%",
  className = "",
  height = "100%"
}) => (
  <svg
    width={width}
    style={style}
    height={height}
    className={className}
    xmlns="http://www.w3.org/2000/svg" 
    viewBox={viewBox || getViewBox(name)}
    xmlnsXlink="http://www.w3.org/1999/xlink" 
  >
    {getPath(name, { fill })}
  </svg>
);

export default SVGIcon;