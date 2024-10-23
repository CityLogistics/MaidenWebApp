import { useMutation } from "@tanstack/react-query";
import Button from "../Button";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { getVehicleLabel, parseError } from "@/lib/utils";
import { changeDriverStatus } from "@/apis/admin";
import { useState } from "react";
import { DriverStatus } from "@/lib/Constants";
import ConfirmDialouge from "../ConfirmDialouge";

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
    provinces,
    cities,
    _id,
  } = data;

  const [loading, setLoading] = useState<DriverStatus | null>(null);
  const [open, setOpen] = useState<any>();

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
      message: `Are you sure you want to ${DriverStatus.ACCEPTED == status ? "accept" : "reject"} driver request?`,
      callback: () => deside(status),
    });
  };

  return (
    <div className=" w-[100%] bg-white my-3 rounded-xl overflow-clip flex flex-col lg:flex-row">
      <div
        className=" h-full w-[250px] mx-auto mt-6 lg:mt-0 lg:w-[20%] bg-slate-50  bg-cover rounded-xl "
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <div className="p-4 flex  justify-between  flex-1 py-6 ml-6 text-[#202224] ">
        <div className="flex-1 justify-between font-bold capitalize">
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
            {getVehicleLabel(vehicleType)}
          </div>
          <div className="opacity-60   mt-4 text-sm ">{phoneNumber}</div>
          <div className="opacity-60   mt-2 text-sm ">{`Valid SGI Vehicle Insurance: ${hasValidVehicleInsurance ? "Yes" : "No"}`}</div>
          <div className="flex opacity-60 text-sm mt-2">
            <div className=" font-semibold mr-1 ">Provinces: </div>
            <div className=" font-normal capitalize ">
              {provinces.map((v: any) => v.toLowerCase()).join(" / ")}
            </div>
          </div>

          <div className="flex opacity-60 text-sm mt-2">
            <div className=" font-semibold mr-1 ">Cities: </div>
            <div className=" font-normal capitalize ">
              {cities.map((v: any) => v.name.toLowerCase()).join(" / ")}
            </div>
          </div>
        </div>
      </div>
      <div className="p-6 ">
        <Button
          loading={isPending && loading == DriverStatus.ACCEPTED}
          onClick={() => confirm(DriverStatus.ACCEPTED)}
          text="Add New Driver"
          className="text-sm rounded-[0.2rem] mt-6"
        />
        <Button
          loading={isPending && loading == DriverStatus.DECLINED}
          onClick={() => confirm(DriverStatus.DECLINED)}
          text="Reject Application"
          className="text-sm text-[#F68716] bg-white hover:border-[#F68716] rounded-[0.2rem] w-full h-12"
        />
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
