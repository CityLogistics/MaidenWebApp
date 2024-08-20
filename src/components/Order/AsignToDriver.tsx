import { getDrivers } from "@/apis/drivers";
import Button from "../Button";
import SelectField from "../SelectField";
import {
  Dialog,
  DialogClose,
  DialogContent,
  //   DialogTrigger,
} from "../ui/dialog";
import { useMutation, useQuery } from "@tanstack/react-query";
import { twMerge } from "tailwind-merge";
import Loader from "../Loader";
import { asignOrderToDriver } from "@/apis/admin";
import { useState } from "react";

export default function AsignToDriver({ orderId, open, setOpen }: any) {
  const [selectedDriver, setSelectedDriver] = useState();
  const { isPending, data } = useQuery({
    queryKey: ["newDrivers"],
    queryFn: () =>
      getDrivers({
        status: "ACCEPTED",
        page: 0,
        limit: 100,
      }),
  });

  const values = data?.data?.data ?? [];

  console.info({ values });

  const { isPending: assignIsLoading, mutate } = useMutation({
    mutationFn: () => asignOrderToDriver(orderId, selectedDriver),
    onSuccess: () => {
      setOpen(false);
      alert("");
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* <DialogTrigger className=" bg-white">{label}</DialogTrigger> */}
      <DialogContent className=" bg-white rounded-2xl w-[32.6rem] min-h-48 p-10 ">
        <div className=" text-[#202224] font-bold">Assign Order to Driver</div>
        <div className="-mt-1">
          <SelectField
            nolabel={true}
            options={values}
            onChange={(e: any) => setSelectedDriver(e.target.value)}
            value={selectedDriver}
          />
          {isPending && (
            <div className="flex justify-end">
              <Loader dotClassess="w-3 h-3" />
            </div>
          )}
          <div
            className={twMerge(
              "w-[9rem] mx-auto  mt-12",
              assignIsLoading && " w-40"
            )}
          >
            <Button
              loading={assignIsLoading}
              onClick={mutate}
              disabled={!selectedDriver}
              text="Assign Order"
              className="text-sm rounded-[0.2rem]"
            />
          </div>
          <div className="w-[9rem] mx-auto mt-1">
            <DialogClose asChild>
              <button
                type="button"
                className="text-sm text-[#F68716] bg-white hover:border-[#F68716] rounded-[0.2rem] w-full h-12"
              >
                Go Back
              </button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
