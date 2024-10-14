import { useState } from "react";
import { Popover, PopoverContent } from "./ui/popover";

import { PopoverAnchor, PopoverPortal } from "@radix-ui/react-popover";
import { twMerge } from "tailwind-merge";
import { MoreVertical } from "lucide-react";

export default function CustomMenu({ children, className }: any) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={() => setOpen(false)}>
      <PopoverAnchor asChild>
        <div className="Row" onClick={() => setOpen(true)}>
          <div
            className="text-sm font-bold flex items-start cursor-pointer"
            onClick={() => setOpen(true)}
          >
            <MoreVertical />
          </div>
        </div>
      </PopoverAnchor>

      <PopoverPortal>
        <PopoverContent
          className={twMerge(
            "bg-white rounded-2xl w-[15rem] min-h-48",
            className
          )}
        >
          {children}
        </PopoverContent>
      </PopoverPortal>
    </Popover>
  );
}
