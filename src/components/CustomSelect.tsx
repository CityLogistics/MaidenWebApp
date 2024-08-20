import { useEffect, useState } from "react";
import { Popover, PopoverContent } from "./ui/popover";

import arrow from "../assets/images/ic-keyboard-arrow-down-48px.png";

import { PopoverAnchor, PopoverPortal } from "@radix-ui/react-popover";
import { twMerge } from "tailwind-merge";
import Button from "./Button";

export default function CustomSelect({
  label,
  onChange,
  items = [],
  values = [],
  capsuleWidth,
}: any) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<any>(values);

  useEffect(() => {
    setSelected(values);
  }, [values, open]);

  const selectedRef: any = {};
  selected.forEach((v: any) => {
    selectedRef[v] = 1;
  });

  const onSelected = (val: any) => {
    const prev = [...selected];
    const index = prev.findIndex((v) => val == v);
    if (index > -1) prev.splice(index, 1);
    else prev.push(val);
    setSelected(prev);
  };

  const onClose = () => {
    if (onChange) onChange(selected);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={() => setOpen(false)}>
      <PopoverAnchor asChild>
        <div className="Row" onClick={() => setOpen(true)}>
          <div
            className="text-sm font-bold flex items-start cursor-pointer"
            onClick={() => setOpen(true)}
          >
            {label}
            <img src={arrow} className=" ml-4 -mt-[3px]" />
          </div>
        </div>
      </PopoverAnchor>

      <PopoverPortal>
        <PopoverContent
          className={twMerge("bg-white rounded-2xl w-[44.5rem] min-h-48")}
        >
          <div className=" text-[#202224] font-bold text-lg">
            Select {label}
          </div>
          <div className="flex mt-6 flex-wrap border-b pb-6 ">
            {items.map((v: any) => (
              <div
                key={v.value}
                onClick={() => onSelected(v.value)}
                className={twMerge(
                  "p-[0.45rem] w-[13rem] rounded-[2rem] text-sm text-[#202224] border-[#979797] border mx-2 mt-2 text-center cursor-pointer",
                  selectedRef[v.value] &&
                    "bg-primary text-white border-primary border ",
                  capsuleWidth && `w-[${capsuleWidth}]`
                )}
              >
                {v.label}
              </div>
            ))}
          </div>
          <div className="flex justify-between w-full h-[8.125rem] p-4 flex-col items-center">
            <div className=" text-[#434343] opacity-80 text-sm w-full  text-left">
              *You can choose multiple {label}
            </div>
            <div className="w-[9.375rem] pb-3">
              <Button
                text="Apply Now"
                className={"text-sm h-10 rounded-[0.25rem]"}
                onClick={onClose}
              />
            </div>
          </div>
        </PopoverContent>
      </PopoverPortal>
    </Popover>
  );
}
