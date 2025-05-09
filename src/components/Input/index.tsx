import React from "react";

type InputProps = {
  label: string;
  name: string;
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  placeholder?: string;
};

const Input: React.FC<InputProps> = ({ name, label, value, onChange, placeholder }) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <input
        type={name}
        id={name}
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className=" block w-full border-gray-300 rounded-md border-1 p-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
      />
    </div>
  );
};

export default Input;
