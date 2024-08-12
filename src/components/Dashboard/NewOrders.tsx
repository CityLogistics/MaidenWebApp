import { ArrowRight2 } from "iconsax-react";
import React from "react";
import { twMerge } from "tailwind-merge";

export default function NewOrders() {
  return (
    <div className=" w-[100%] bg-white h-full  rounded-xl p-6 py-7">
      <div className="flex justify-between">
        <div className="text-[#202224] font-bold">New Orders</div>
        <div className="text-[#F68716] font-normal text-[0.625rem]">
          View All
        </div>
      </div>
      {[1, 1, 1, 1, 1, 1].map((v, i) => (
        <OrderCard key={v} last={i == 5} />
      ))}
    </div>
  );
}

function OrderCard({ last }: any) {
  return (
    <div className={twMerge("py-5 ", !last && "border-b border-[#F2EDED]")}>
      <div className="flex justify-between items-center">
        <div className="text-[#202224] font-bold  text-xs">Order #12345</div>
        <div className="text-[#F68716] font-normal text-[0.625rem] flex items-center">
          Assign to Driver <ArrowRight2 size={10} variant="Linear" />
        </div>
      </div>
      <div className=" text-[#828282] text-[0.625rem]">
        Pick up at 123 abc road, canada
      </div>
      <div className=" text-[#2F80ED] text-[0.625rem]">10 minutes ago</div>
    </div>
  );
}
