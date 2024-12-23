import { getManualOrders } from "@/apis/orders";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight2 } from "iconsax-react";
import { twMerge } from "tailwind-merge";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { manualOrdersRoute } from "@/router";
import DeadState from "../DeadState";
import { timeFormNow } from "@/lib/utils";
import SetPrice from "../Order/SetPrice";

export default function ManualOrders() {
  const query = {
    page: 0,
    limit: 5,
  };
  const { isPending, data, refetch } = useQuery({
    queryKey: ["manualOrders"],
    queryFn: () => getManualOrders(query),
  });

  const values = data?.data.data ?? [];

  return (
    <div className=" w-[100%] bg-white h-full  rounded-xl p-6 py-7 overflow-y-hidden">
      <div className="flex justify-between">
        <div className="text-[#202224] font-bold">Quote Requests</div>
        <Link to={manualOrdersRoute.to}>
          <div className="text-[#F68716] font-normal text-[0.625rem]">
            View All
          </div>
        </Link>
      </div>
      {isPending ? (
        <>
          {[1, 2, 3].map((i) => (
            <OrderLoading key={i} />
          ))}
        </>
      ) : (
        <>
          {values.map((v: any, i: number) => (
            <OrderCard
              key={i}
              data={v}
              last={i == values.length - 1}
              refetch={refetch}
            />
          ))}
          {values.length == 0 && <DeadState />}
        </>
      )}
    </div>
  );
}

function OrderCard({ data, last }: any) {
  const { _id, pickupAddress, updatedAt } = data;
  const [open, setOpen] = useState(false);

  return (
    <div className={twMerge("py-5 ", !last && "border-b border-[#F2EDED]")}>
      <div className="flex justify-between items-center">
        <div className="text-[#202224] font-bold  text-xs">Order #{_id}</div>
        {open && <SetPrice open={open} setOpen={setOpen} orderId={_id} />}
        <div
          onClick={() => setOpen(true)}
          className="text-[#F68716] font-normal text-[0.625rem] flex items-center bg-white cursor-pointer"
        >
          Send Quote <ArrowRight2 size={10} variant="Linear" />
        </div>
      </div>
      <div className=" text-[#828282] text-[0.625rem]">
        {` Pick up at ${pickupAddress.address}, ${pickupAddress.province}.`}
      </div>
      <div className=" text-[#2F80ED] text-[0.625rem]">
        {" "}
        {timeFormNow(updatedAt)} ago
      </div>
    </div>
  );
}

function OrderLoading({ last }: any) {
  return (
    <div
      className={twMerge(
        "py-5 animate-pulse flex space-x-4",
        !last && "border-b border-[#F2EDED]"
      )}
    >
      <div className="flex-1 space-y-6 py-1">
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-4">
            <div className="h-2 bg-slate-700 rounded w-3/12 col-span-2"></div>
            <div className="h-2 bg-slate-700 rounded col-span-1"></div>
          </div>
          <div className="h-2 bg-slate-700 rounded w-1/2"></div>
          <div className="h-2 bg-slate-700 rounded w-3/12"></div>
        </div>
      </div>
    </div>
  );
}
