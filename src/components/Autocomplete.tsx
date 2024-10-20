import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

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
  items: any[];
};
export default function Autocomplete({
  label,
  itemRight,
  onChange,
  value,
  placeholder,
  error,
  helperText,
  items,
}: prop) {
  const handleOnSelect = (item: any) => {
    onChange(item.name);
  };

  const handleOnSearch = (item: any) => {
    onChange(item);
  };

  return (
    <div className="w-full flex flex-col items-start mt-9">
      <div className="opacity-80 text-[#202224] text-lg font-semibold font-['Nunito Sans'] flex justify-between">
        {label}
        <div>{itemRight}</div>
      </div>

      <ReactSearchAutocomplete
        inputSearchString={value}
        placeholder={placeholder}
        items={items}
        onSearch={handleOnSearch}
        // onHover={handleOnHover}
        onSelect={handleOnSelect}
        // onFocus={handleOnFocus}
        // autoFocus
        // formatResult={formatResult}
        className="block w-full h-12 rounded-md bg-[#F1F4F9] border-0  text-black disabled:text-gray-400 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black text-base sm:text-sm sm:leading-6 mt-2 base-input"
        styling={{
          height: "44px",
          border: "1px solid #dfe1e5",
          borderRadius: "0px",
          backgroundColor: "#F1F4F9",
          boxShadow: "none",
          hoverBackgroundColor: "#eee",
          color: "#212121",
          fontSize: "16px",
          fontFamily: "Arial",
          iconColor: "grey",
          lineColor: "rgb(232, 234, 237)",
          placeholderColor: "grey",
          clearIconMargin: "3px 14px 0 0",
          searchIconMargin: "0 0 0 16px",
          zIndex: 100,
          // width: "100%",
        }}
      />
      {helperText && (
        <p className={twMerge("text-xs text-black", error && " text-red-500")}>
          {helperText}
        </p>
      )}
    </div>
  );
}
