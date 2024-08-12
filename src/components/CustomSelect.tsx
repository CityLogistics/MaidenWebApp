import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Control } from "./CustomDatePicker";

export default function CustomSelect() {
  const [open, setopen] = useState();
  return (
    <Popover>
      <PopoverTrigger>Open</PopoverTrigger>
      <PopoverContent className=" bg-white rounded-2xl w-[32.6rem] min-h-48">
        <div className=" text-[#202224] font-bold text-lg">
          Select Order Type
        </div>
        <div className="flex mt-6 flex-wrap border-b pb-6">
          <div className="p-[0.45rem] px-4 bg-primary rounded-[2rem] text-sm text-white mx-2">
            Health & Medicine
          </div>
          <div className="p-[0.45rem] font-bold px-4 bg-white rounded-[2rem] border border-[#979797] text-sm text-[#202224] mx-2">
            Health & Medicine
          </div>
          <div className="p-[0.45rem] px-4 bg-primary rounded-[2rem] text-sm text-white mx-2">
            Health & Medicine
          </div>
          <div className="p-[0.45rem] mt-2 font-bold px-4 bg-white rounded-[2rem] border border-[#979797] text-sm text-[#202224] mx-2">
            Health & Medicine
          </div>
          <div className="p-[0.45rem] mt-2 px-4 bg-primary rounded-[2rem] text-sm text-white mx-2">
            Health & Medicine
          </div>
          <div className="p-[0.45rem] mt-2 font-bold px-4 bg-white rounded-[2rem] border border-[#979797] text-sm text-[#202224] mx-2">
            Health & Medicine
          </div>

          <div className="p-[0.45rem] mt-2 font-bold px-4 bg-white rounded-[2rem] border border-[#979797] text-sm text-[#202224] mx-2">
            Health & Medicine
          </div>
          <div className="p-[0.45rem] mt-2 px-4 bg-primary rounded-[2rem] text-sm text-white mx-2">
            Health & Medicine
          </div>
        </div>
        <Control />
      </PopoverContent>
    </Popover>
  );
}
