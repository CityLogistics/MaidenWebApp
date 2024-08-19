import { useEffect, useState } from "react";
import Button from "./Button";
import arrow from "../assets/images/ic-keyboard-arrow-down-48px.png";

import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent } from "./ui/popover";
import { PopoverAnchor, PopoverPortal } from "@radix-ui/react-popover";

export function CustomDatePicker({ onChange, values }: any) {
  const tomorrow = new Date();

  tomorrow.setDate(tomorrow.getDate() + 1);

  const [selected, setSelected] = useState(values);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setSelected(values);
  }, [values, open]);

  const onClose = () => {
    if (onChange) onChange(selected);
    setOpen(false);
  };

  console.info({ selected });

  return (
    <>
      <Popover open={open} onOpenChange={() => setOpen(false)}>
        <PopoverAnchor asChild>
          <div className="Row" onClick={() => setOpen(true)}>
            <div
              className="text-sm font-bold flex items-start cursor-pointer"
              onClick={() => setOpen(true)}
            >
              Date
              <img src={arrow} className=" ml-4 -mt-[3px]" />
            </div>
          </div>
        </PopoverAnchor>

        <PopoverPortal>
          <PopoverContent className="bg-white rounded-2xl w-fit  min-h-48">
            <Calendar
              mode="single"
              selected={selected}
              onSelect={(v) => setSelected((val: any) => [...val, v])}
              // onSelect={(v) => setSelected(v)}
              className="rounded-md border-y"
            />
            <div className="flex justify-between w-full h-[8.125rem] p-4 flex-col items-center">
              <div className=" text-[#434343] opacity-80 text-sm w-full  text-left">
                *You can choose multiple date
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
    </>
  );
}
