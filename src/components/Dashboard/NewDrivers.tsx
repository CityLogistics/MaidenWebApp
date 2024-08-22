import { getDrivers } from "@/apis/drivers";
import { newDriversRoute } from "@/router";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { ArrowRight2 } from "iconsax-react";
import { twMerge } from "tailwind-merge";

export default function NewDrivers() {
  const query = {
    status: "PENDING",
    page: 0,
    limit: 2,
  };

  const { isPending, data, refetch } = useQuery({
    queryKey: ["newdrivers", query],
    queryFn: () => getDrivers(query),
  });

  const values = data?.data.data ?? [];

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
      {isPending ? (
        <>
          {[1, 2].map((v) => (
            <DriverCardLoading key={v} />
          ))}
        </>
      ) : (
        <>
          {values.map((v: any, i: any) => (
            <DriverCard key={i} data={v} last={i == 1} />
          ))}
        </>
      )}
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

function DriverCardLoading() {
  return (
    <div
      className={twMerge(
        "py-5 flex justify-between border-b border-[#F2EDED] animate-pulse"
      )}
    >
      <div className=" ">
        <div className="bg-[#828282] h-3 w-28 rounded-[8px] font-bold  text-xs" />
        <div className=" bg-[#828282] h-2 w-12 rounded-[8px] mt-2" />
        <div className=" bg-[#828282] h-2 w-16 rounded-[8px] mt-2" />
      </div>

      <div className="flex flex-col justify-between">
        <div className="bg-[#828282] h-2 w-14 rounded-[8px]" />
        <div className="bg-[#828282] h-2 w-14 rounded-[8px]">
          Reject Request <ArrowRight2 size={10} variant="Linear" />
        </div>
      </div>
    </div>
  );
}
