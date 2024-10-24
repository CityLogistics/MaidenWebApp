import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type prop = {
  label: string;
  itemRight?: ReactNode;
  id?: any;
  name?: any;
  type?: any;
  onChange?: any;
  value?: any;
  placeholder?: any;
  error: any;
  helperText: any;
  disabled?: boolean;
};
export default function PhoneField({
  label,
  itemRight,
  id,
  name,
  type,
  onChange,
  value,
  placeholder,
  error,
  helperText,
  disabled = false,
}: prop) {
  return (
    <div className="w-full flex flex-col items-start mt-9">
      <div className="opacity-80 text-[#202224] text-lg font-semibold font-['Nunito Sans'] flex justify-between">
        {label}
        <div>{itemRight}</div>
      </div>

      <div className="flex w-full relative h-12 mt-2">
        <span className="  absolute left-2  h-full flex items-center text-[#616161] z-50 ">
          +1
        </span>
        <input
          type={type ?? "text"}
          name={name}
          id={id}
          className="block w-full h-12 rounded-md bg-[#F1F4F9] border-0  pl-7 pr-20 text-black disabled:text-gray-400 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black text-base sm:text-sm sm:leading-6  base-input"
          style={{ backgroundColor: "#F1F4F9" }}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          disabled={disabled}
        />
      </div>
      {helperText && (
        <p className={twMerge("text-xs text-black", error && " text-red-500")}>
          {helperText}
        </p>
      )}
    </div>
  );
}
