import { useMutation } from "@tanstack/react-query";
import Button from "../Button";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { parseError } from "@/lib/utils";
import { changeDriverStatus } from "@/apis/admin";
import { useRef, useState } from "react";
import { DriverStatus } from "@/lib/Constants";

export default function NewDriverCard({ data, refetch }: any) {
  const {
    firstName,
    lastName,
    vehicleType,
    email,
    phoneNumber,
    availabiltyDays,
    availabiltyTime,
    image,
    hasValidVehicleInsurance,

    _id,
  } = data;

  const [loading, setLoading] = useState<DriverStatus | null>(null);
  const { isPending, mutateAsync } = useMutation({
    mutationFn: (data: any) => changeDriverStatus(_id, data),
    onSuccess: () => {
      if (refetch) refetch();

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
    setLoading(status);

    await mutateAsync({
      status,
    });

    setLoading(null);
  };

  return (
    <div className=" w-[100%] bg-white my-3 rounded-xl overflow-clip flex flex-col lg:flex-row">
      <div
        className=" h-[12rem] w-[250px] mx-auto mt-6 lg:mt-0 lg:w-[20%] bg-slate-50  bg-cover rounded-xl "
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <div className="p-4 flex  justify-between  flex-1 py-6 ml-6 text-[#202224] ">
        <div className="flex-1 justify-between font-bold">
          <div className=" ">{`${firstName} ${lastName}`}</div>
          <div className=" opacity-60 font-normal mt-4">{email}</div>
          <div className="flex   opacity-60 text-sm mt-2">
            <div className=" font-semibold mr-1 ">Days: </div>
            <div className=" font-normal capitalize ">
              {availabiltyDays.map((v: any) => v.toLowerCase()).join(" / ")}
            </div>
          </div>
          <div className="flex opacity-60 text-sm mt-2">
            <div className=" font-semibold mr-1 ">Availability: </div>
            <div className=" font-normal capitalize ">
              {availabiltyTime.map((v: any) => v.toLowerCase()).join(" / ")}
            </div>
          </div>
        </div>

        <div className="flex-1 justify-between  text-[#202224] ">
          <div className=" capitalize font-bold">
            {vehicleType?.toLowerCase()}
          </div>
          <div className="opacity-60   mt-4 text-sm ">{phoneNumber}</div>
          <div className="opacity-60   mt-2 text-sm ">
            Preferred Zone: West Side
          </div>
          <div className="opacity-60   mt-2 text-sm ">{`Valid SGI Vehicle Insurance: ${hasValidVehicleInsurance ? "Yes" : "No"}`}</div>
        </div>
      </div>
      <div className="p-6 ">
        <Button
          loading={isPending && loading == DriverStatus.ACCEPTED}
          onClick={() => deside(DriverStatus.ACCEPTED)}
          text="Add New Driver"
          className="text-sm rounded-[0.2rem] mt-6"
        />
        <Button
          loading={isPending && loading == DriverStatus.DECLINED}
          onClick={() => deside(DriverStatus.DECLINED)}
          text="Reject Application"
          className="text-sm text-[#F68716] bg-white hover:border-[#F68716] rounded-[0.2rem] w-full h-12"
        />
      </div>
    </div>
  );
}