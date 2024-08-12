import React, { ReactNode } from "react";

type pageprop = {
  label: string;
  itemRight?: ReactNode;
};
export default function PasswordField({ label, itemRight }: pageprop) {
  return (
    <div className="w-full flex flex-col items-start mt-9">
      <div className="opacity-80 text-[#202224] text-lg font-semibold font-['Nunito Sans'] flex justify-between w-full">
        {label}
        <div>{itemRight}</div>
      </div>

      <input
        type="password"
        name="price"
        id="price"
        className="block w-full h-14 rounded-md bg-[#F1F4F9] border-0 py-1.5 pl-7 pr-20 text-black ring-1 ring-inset ring-gray-300 focus:ring-black text-base placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6
         mt-2
        "
        placeholder="0.00"
      />
    </div>
  );
}
