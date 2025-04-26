import React from "react";
import { ButtonProps } from "./types";

const Button: React.FC<ButtonProps> = ({
  type,
  text,
  handleClick,
  disabled,
}) => {
  return (
    <button
      onClick={handleClick}
      type={type}
      disabled={disabled}
      className={`flex w-full justify-center rounded-md  ${
        disabled
          ? "bg-gray-300 cursor-not-allowed"
          : "bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 shadow-md hover:bg-red-500"
      } text-white`}
    >
      {text}
    </button>
  );
};

export default Button;
