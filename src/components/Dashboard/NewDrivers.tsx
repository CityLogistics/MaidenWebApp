import { changeDriverStatus } from "@/apis/admin";
import { getDrivers } from "@/apis/drivers";
import { DriverStatus } from "@/lib/Constants";
import { parseError, queryClient, timeFormNow } from "@/lib/utils";
import { newDriversRoute } from "@/router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { AxiosError } from "axios";
import { ArrowRight2, Note1, NoteSquare } from "iconsax-react";
import { useState } from "react";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";
import Loader from "../Loader";
import ConfirmDialouge from "../ConfirmDialouge";
import DeadState from "../DeadState";

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
            <DriverCard key={i} data={v} refetch={refetch} last={i == 1} />
          ))}
          {values.length == 0 && <DeadState />}
        </>
      )}
    </div>
  );
}

function DriverCard({ data, refetch, last }: any) {
  const { firstName, lastName, vehicleType, updatedAt, _id } = data;

  const [loading, setLoading] = useState<DriverStatus | null>(null);
  const [open, setOpen] = useState<any>();

  const { mutateAsync } = useMutation({
    mutationFn: (data: any) => changeDriverStatus(_id, data),
    onSuccess: () => {
      if (refetch) refetch();
      queryClient.invalidateQueries({ queryKey: ["stats"] });

      toast.success(
        loading == DriverStatus.ACCEPTED
          ? "New driver added"
          : "Driver request declined"
      );
    },
    onError: (e: AxiosError) => {
      toast.error(parseError(e));
    },
  });

  const deside = async (status: DriverStatus) => {
    setOpen(null);
    setLoading(status);

    await mutateAsync({
      status,
    });

    setLoading(null);
  };

  const confirm = (status: DriverStatus) => {
    setOpen({
      status,
      message: `Are you sure you want to ${DriverStatus.ACCEPTED == status ? "accept" : "reject"} driver request`,
      callback: () => deside(status),
    });
  };

  return (
    <div
      className={twMerge(
        "py-5 flex justify-between border-b border-[#F2EDED]",
        !last && " "
      )}
    >
      <div className=" ">
        <div className="text-[#202224] font-bold  text-xs">
          Mr {`${firstName} ${lastName}`}
        </div>
        <div className=" text-[#828282] text-[0.625rem]">
          {" "}
          {vehicleType?.toLowerCase()}
        </div>
        <div className=" text-[#2F80ED] text-[0.625rem]">
          {timeFormNow(updatedAt)}
        </div>
      </div>

      <div className="flex flex-col justify-between">
        {loading ? (
          <Loader dotClassess="w-2 h-2" />
        ) : (
          <>
            <div
              className="text-[#27AE60] font-normal text-[0.625rem] flex items-center cursor-pointer"
              onClick={() => confirm(DriverStatus.ACCEPTED)}
            >
              Accept Request <ArrowRight2 size={10} variant="Linear" />
            </div>
            <div
              className="text-[#EB5757] font-normal text-[0.625rem] flex items-center cursor-pointer"
              onClick={() => confirm(DriverStatus.DECLINED)}
            >
              Reject Request <ArrowRight2 size={10} variant="Linear" />
            </div>
          </>
        )}
      </div>
      {open && (
        <ConfirmDialouge
          onCancel={() => setOpen(null)}
          onProceed={open.callback}
          message={open.message}
        />
      )}
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
