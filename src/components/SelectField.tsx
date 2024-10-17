import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type prop = {
  label?: string;
  itemRight?: ReactNode;
  id?: any;
  name?: any;
  type?: any;
  onChange?: any;
  value?: any;
  placeholder?: any;
  error?: any;
  helperText?: any;
  nolabel?: boolean;
  options: any[];
};
export default function SelectField({
  label,
  itemRight,
  id,
  name,
  onChange,
  value,
  error,
  helperText,
  nolabel = false,
  options = [],
}: prop) {
  return (
    <div className="w-full flex flex-col items-start mt-9">
      {!nolabel && (
        <div className="opacity-80 text-[#202224] text-lg font-semibold font-['Nunito Sans'] flex justify-between">
          {label}
          <div>{itemRight}</div>
        </div>
      )}

      <select
        name={name}
        id={id}
        className="block w-full h-12 rounded-md bg-[#F1F4F9] border-0 py-1.5 px-7 pr-20 text-black ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black text-base sm:text-sm sm:leading-6
         mt-2
        "
        onChange={onChange}
        value={value}
      >
        <option selected hidden>
          {" "}
          Select
        </option>
        {options.map((v) => (
          <option key={v.value} value={v.value}>
            {`${v.label} `}
          </option>
        ))}
      </select>
      {helperText && (
        <p className={twMerge("text-xs text-black", error && " text-red-500")}>
          {helperText}
        </p>
      )}
    </div>
  );
}
