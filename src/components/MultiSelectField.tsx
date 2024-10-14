import Multiselect from "multiselect-react-dropdown";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type prop = {
  label?: string;
  itemRight?: ReactNode;
  id?: any;
  type?: any;
  onChange?: any;
  values?: string[];
  placeholder?: any;
  error?: any;
  helperText?: any;
  nolabel?: boolean;
  loading: boolean;
  options: any[];
};
export default function MultiSelectField({
  label,
  itemRight,
  id,
  onChange,
  values = [],
  error,
  helperText,
  nolabel = false,
  options = [],
  loading,
}: prop) {
  const valuesRef: any = {};

  values.forEach((element: string) => {
    valuesRef[element] = 1;
  });

  const selectedValues = options.filter((v) => valuesRef[v.id]);

  const handleChange = (selectedList: any, selectedItem: any) => {
    onChange(selectedList.map((v: any) => v.id));
  };

  return (
    <div className="w-full flex flex-col items-start mt-9">
      {!nolabel && (
        <div className="opacity-80 text-[#202224] text-lg font-semibold font-['Nunito Sans'] flex justify-between">
          {label}
          <div>{itemRight}</div>
        </div>
      )}

      <Multiselect
        id={id}
        options={options}
        selectedValues={selectedValues} // Preselected value to persist in dropdown
        onSelect={handleChange} // Function will trigger on select event
        onRemove={handleChange} // Function will trigger on remove event
        keepSearchTerm
        showCheckbox
        loading={loading}
        displayValue="name" // Property name to display in the dropdown options
        style={{
          multiselectContainer: {
            // To change css for multiselect (Width,height,etc..)
            backgroundColor: "#F1F4F9",
            padding: "opx",
          },
          inputField: {
            // To change input field position or margin
            // height: "3rem",
            paddingTop: "0.375rem",
            paddingBottom: "0.375rem",
            paddingLeft: "1.75rem",
            paddingRight: "5rem",
            // backgroundColor: "#F1F4F9",
          },
          option: {
            // To change css for dropdown options
            color: "#000",
          },
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
