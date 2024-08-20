import { newDriversRoute } from "@/router";
import { Link } from "@tanstack/react-router";
import { ArrowRight2 } from "iconsax-react";
import { twMerge } from "tailwind-merge";

export default function NewDrivers() {
  return (
    <div className=" w-[100%] bg-white h-full rounded-xl p-6 py-7 overflow-clip">
      <div className="flex justify-between items-center">
        <div className="text-[#202224] font-bold">New Driver’s Requests</div>
        <Link to={newDriversRoute.to}>
          <div className="text-[#F68716] font-normal text-[0.625rem]">
            View All
          </div>
        </Link>
      </div>
      {[1, 1].map((v, i) => (
        <DriverCard key={v} last={i == 1} />
      ))}
    </div>
  );
}

function DriverCard({ last }: any) {
  return (
    <div
      className={twMerge(
        "py-5 flex justify-between border-b border-[#F2EDED]",
        !last && " "
      )}
    >
      <div className=" ">
        <div className="text-[#202224] font-bold  text-xs">
          Mr Antony Gabriel
        </div>
        <div className=" text-[#828282] text-[0.625rem]">Sedan/Salon</div>
        <div className=" text-[#2F80ED] text-[0.625rem]">10 minutes ago</div>
      </div>

      <div className="flex flex-col justify-between">
        <div className="text-[#27AE60] font-normal text-[0.625rem] flex items-center">
          Accept Request <ArrowRight2 size={10} variant="Linear" />
        </div>
        <div className="text-[#EB5757] font-normal text-[0.625rem] flex items-center">
          Reject Request <ArrowRight2 size={10} variant="Linear" />
        </div>
      </div>
    </div>
  );
}
