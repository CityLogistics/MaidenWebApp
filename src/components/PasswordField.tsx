import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type prop = {
  label: string;
  itemRight?: ReactNode;
  id?: any;
  name?: any;
  onChange?: any;
  value?: any;
  error: any;
  helperText: any;
};
export default function PasswordField({
  label,
  itemRight,
  id,
  name,
  onChange,
  value,
  error,
  helperText,
}: prop) {
  return (
    <div className="w-full flex flex-col items-start mt-9">
      <div className="opacity-80 text-[#202224] text-lg font-semibold font-['Nunito Sans'] flex justify-between w-full">
        {label}
        <div>{itemRight}</div>
      </div>

      <input
        type="password"
        name={name}
        id={id}
        className="block w-full h-12 rounded-md bg-[#F1F4F9] border-0 py-1.5 pl-7 pr-20 text-black ring-1 ring-inset ring-gray-300 focus:ring-black text-base placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:leading-6
         mt-2
        "
        onChange={onChange}
        value={value}
      />
      {helperText && (
        <p className={twMerge("text-xs text-black", error && " text-red-500")}>
          {helperText}
        </p>
      )}
    </div>
  );
}
