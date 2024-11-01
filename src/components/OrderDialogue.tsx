import { format } from "date-fns";
import Button from "./Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  //   DialogTrigger,
} from "./ui/dialog";
import { useUserStore } from "@/store/user";
import { getVehicleLabel, parseError, queryClient } from "@/lib/utils";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useIsMutating, useMutation } from "@tanstack/react-query";
import { rejectOrder, updateOrderStatus } from "@/apis/orders";
import { ROLE } from "@/lib/Constants";
import { useState } from "react";
import { CheckIcon, X } from "lucide-react";
import { decideOrderAssignment, updateDriverOrderStatus } from "@/apis/drivers";
import ConfirmDialouge from "./ConfirmDialouge";
import { twMerge } from "tailwind-merge";
import AsignToDriver from "./Order/AsignToDriver";

export default function OrderDialogue({ setOpen, onCancel, order = {} }: any) {
  const [assignOpen, setAssignOpen] = useState(false);

  const getStatusLabel = (data: any) => {
    const status = data.toLowerCase();
    const classNames = "";

    switch (data) {
      case "COMPLETED":
        return (
          <div className={twMerge(classNames, " text-[#00b69b]")}>{status}</div>
        );

      case "ASSIGNED":
        return (
          <div className={twMerge(classNames, "  text-[#FFA500]")}>
            {status}
          </div>
        );
      case "DELIVERED":
        return (
          <div className={twMerge(classNames, "  text-[#0027b6]")}>
            {status}
          </div>
        );
      case "REJECTED":
        return (
          <div className={twMerge(classNames, " text-[#fd5454]")}>{status}</div>
        );

      case "PENDING_PAYMENT":
        return (
          <div className={twMerge(classNames, "bg-[#f8f8f6] text-[#fcbe2d] ")}>
            Pending Payment
          </div>
        );

      case "PENDING_ASSIGNMENT":
        return (
          <div className={twMerge(classNames, "bg-[#f8f8f6] text-[#fcbe2d] ")}>
            Pending Assignment
          </div>
        );

      default:
        return (
          <div className={twMerge(classNames, "bg-[#f8f8f6] text-[#fcbe2d] ")}>
            {status}
          </div>
        );
    }
  };

  const isFetching = useIsMutating();

  const {
    _id,
    basePrice,
    createdAt,
    updatedAt,
    discription,

    distance,
    driver,
    dropOffAddress,
    dropOffPhoneNumber,
    email,
    orderNo,
    pickupAddress,
    pickupDate,
    pickupPhoneNumber,
    pickuptime,
    recipientName,
    senderName,
    status,
    totalPrice,
    tranasctionReference,
    vehicleType,
    assignedCityId,
  } = order;

  const items = [
    {
      label: "Order",
      value: orderNo,
    },
    {
      label: "Customer’s Name",
      value: <div className=" text-nowrap">{senderName}</div>,
    },
    {
      label: "Customer’s Email",
      value: <div className=" text-nowrap">{email}</div>,
    },
    {
      label: "Recipient's Name",
      value: <div className=" text-nowrap">{recipientName}</div>,
    },

    {
      label: "Transaction Date",
      value: (
        <>
          {(updatedAt || createdAt) &&
            format(updatedAt ?? createdAt, "dd MMMM YYY")}
        </>
      ),
    },
    {
      label: "Pickup Date",
      value: <>{pickupDate && format(pickupDate, "dd MMMM YYY")}</>,
    },
    {
      label: "Pickup Time",
      value: <div className=" text-nowrap">{pickuptime}</div>,
    },

    {
      label: "Distance (KM)",
      value: distance,
    },
    {
      label: "Base Price ($)",
      value: basePrice / 100,
    },
    {
      label: "Total Price ($)",
      value: totalPrice / 100,
    },
    ...(driver
      ? [
          {
            label: "Assigned Driver",
            value: `${driver.firstName} ${driver.lastName}`,
          },
        ]
      : []),
    {
      label: "Vehicle Type",
      value: getVehicleLabel(vehicleType),
    },

    {
      label: "Status",
      value: (
        <div className="flex justify-center">{getStatusLabel(status)}</div>
      ),
    },
    {
      label: "Pickup Phone",
      value: pickupPhoneNumber,
    },
    {
      label: "Dropoff Phone",
      value: dropOffPhoneNumber,
    },
    {
      label: "Pickup Province",
      value: pickupAddress.province,
    },
    {
      label: "Dropoff Province",
      value: dropOffAddress.province,
    },
    {
      label: "Pickup Location",
      value: pickupAddress.address,
    },
    {
      label: "Dropoff Location",
      value: dropOffAddress.address,
    },
    {
      label: "Pickup City",
      value: pickupAddress.city,
    },
    {
      label: "Dropoff City",
      value: dropOffAddress.city,
    },
    {
      label: "Transaction Reference",
      value: (
        <div className=" text-wrap w-full break-all">
          {tranasctionReference}
        </div>
      ),
    },
    {
      label: "Description",
      value: discription,
    },
  ];

  const role = useUserStore((state) => state.user.role);

  const getStatusAction = (status: any, id: any) => {
    if (
      status == "PENDING_ASSIGNMENT" &&
      (role == ROLE.ADMIN || role == ROLE.SUPER_ADMIN)
    )
      return (
        <div className="flex w-full justify-center ">
          {/* <div
            onClick={() => setAssignOpen(true)}
            className="text-[#358C9D] font-semibold text-sm flex items-center bg-white cursor-pointer text-nowrap"
          >
            Assign to Driver
          </div> */}

          <Button
            // loading={isPending}
            text={"Assign to Driver"}
            className={"text-sm h-10 rounded-[0.25rem] text-nowrap w-40 "}
            onClick={() => setAssignOpen(true)}
          />
          <div className="w-1" />
          <RejectOrder id={id} />
        </div>
      );

    if (
      status == "DELIVERED" &&
      (role == ROLE.ADMIN || role == ROLE.SUPER_ADMIN)
    )
      return <MarkComplete id={id} />;

    if (status == "PROCESSING" && role == "DRIVER")
      return <MarkDelivered id={id} />;

    if (status == "ASSIGNED" && role == "DRIVER")
      return (
        <div className="flex w-full justify-center ">
          <AcceptRequest id={id} />
          <div className="w-1" />
          <RejectRequest id={id} />
        </div>
      );

    return "";
  };

  const driverAssigned = () => {
    queryClient.invalidateQueries({ queryKey: ["newOrders"] });
    onCancel();
  };

  if (assignOpen)
    return (
      <AsignToDriver
        open={assignOpen}
        orderId={_id}
        setOpen={setAssignOpen}
        refetch={driverAssigned}
        orderCityId={assignedCityId}
      />
    );

  return (
    <Dialog open onOpenChange={setOpen}>
      {/* <DialogTrigger className=" bg-white">{label}</DialogTrigger> */}
      <DialogContent className=" bg-white rounded-2xl w-[100%] sm:w-[32.6rem] min-h-48 py-10 px-0 ">
        <div className="text-[#202224] text-[2rem] font-bold font-['Nunito Sans'] text-center relative">
          Order Details
        </div>
        <div className="absolute top-5 right-10">
          <DialogClose asChild>
            <X
              color="black"
              className=" cursor-pointer hover:bg-slate-100 rounded-full"
              onClick={isFetching ? () => null : () => onCancel()}
            />
          </DialogClose>
        </div>
        <div className="flex flex-col max-h-[70vh] overflow-y-auto px-10 ">
          {items.map((v, i) => (
            <div key={i} className="flex w-full justify-between mt-2">
              <div className="text-bold text-black font-medium text-nowrap mr-10">
                {v.label}
              </div>
              <div className=" text-black opacity-70 text-right">{v.value}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center">
          {getStatusAction(status, _id)}
        </div>
      </DialogContent>
    </Dialog>
  );
}

const MarkComplete = ({ id }: any) => {
  const [open, setOpen] = useState(false);
  const { isPending, mutateAsync } = useMutation({
    mutationKey: ["MarkComplete"],
    mutationFn: () => updateOrderStatus({ id, order: { status: "COMPLETED" } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Order status changed");
    },
    onError: (e: AxiosError) => {
      toast.error(parseError(e));
    },
  });

  const onProceed = () => {
    setOpen(false);
    mutateAsync();
  };

  return (
    <>
      <Button
        loading={isPending}
        text={
          !isPending && (
            <>
              Mark Completed <CheckIcon size={20} />
            </>
          )
        }
        className={"text-sm h-10 rounded-[0.25rem] text-nowrap w-40 "}
        onClick={() => setOpen(true)}
      />
      {open && (
        <ConfirmDialouge
          message="Are you sure you want to mark this order as completed?"
          onProceed={onProceed}
          onCancel={() => setOpen(false)}
          setOpen={setOpen}
        />
      )}
    </>
  );
};

const MarkDelivered = ({ id }: any) => {
  const [open, setOpen] = useState(false);
  const { isPending, mutateAsync } = useMutation({
    mutationKey: ["MarkDelivered"],
    mutationFn: () =>
      updateDriverOrderStatus({ id, order: { status: "DELIVERED" } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Order status changed");
    },
    onError: (e: AxiosError) => {
      toast.error(parseError(e));
    },
  });

  const onProceed = () => {
    setOpen(false);
    mutateAsync();
  };

  return (
    <>
      <Button
        loading={isPending}
        text={
          !isPending && (
            <>
              Mark Delivered <CheckIcon size={20} />
            </>
          )
        }
        className={"text-sm h-10 rounded-[0.25rem] text-nowrap w-40 "}
        onClick={() => setOpen(true)}
      />
      {open && (
        <ConfirmDialouge
          message="Are you sure you want to mark this order as delivered?"
          onProceed={onProceed}
          onCancel={() => setOpen(false)}
          setOpen={setOpen}
        />
      )}
    </>
  );
};

const AcceptRequest = ({ id }: any) => {
  const [open, setOpen] = useState(false);
  const { isPending, mutateAsync } = useMutation({
    mutationKey: ["AcceptRequest"],
    mutationFn: () => decideOrderAssignment({ id, data: { action: "ACCEPT" } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Order status changed");
    },
    onError: (e: AxiosError) => {
      toast.error(parseError(e));
    },
  });

  const onProceed = () => {
    setOpen(false);
    mutateAsync();
  };

  return (
    <>
      <Button
        loading={isPending}
        text={
          !isPending && (
            <>
              Accept <CheckIcon size={20} />
            </>
          )
        }
        className={"text-sm h-10 rounded-[0.25rem] text-nowrap w-40 "}
        onClick={() => setOpen(true)}
      />
      {open && (
        <ConfirmDialouge
          message="Are you sure you want to accept this order assignment?"
          onProceed={onProceed}
          onCancel={() => setOpen(false)}
          setOpen={setOpen}
        />
      )}
    </>
  );
};

const RejectRequest = ({ id }: any) => {
  const [open, setOpen] = useState(false);
  const { isPending, mutateAsync } = useMutation({
    mutationKey: ["RejectRequest"],
    mutationFn: () =>
      decideOrderAssignment({ id, data: { action: "DECLINE" } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Order status changed");
    },
    onError: (e: AxiosError) => {
      toast.error(parseError(e));
    },
  });

  const onProceed = () => {
    setOpen(false);
    mutateAsync();
  };

  return (
    <>
      <Button
        loading={isPending}
        text={
          !isPending && (
            <>
              Reject <X size={20} />
            </>
          )
        }
        className={
          "text-sm h-10 rounded-[0.25rem] text-nowrap w-40 bg-red-600 "
        }
        onClick={() => setOpen(true)}
      />
      {open && (
        <ConfirmDialouge
          message="Are you sure you want to reject this order assignment?"
          onProceed={onProceed}
          onCancel={() => setOpen(false)}
          setOpen={setOpen}
        />
      )}
    </>
  );
};

const RejectOrder = ({ id }: any) => {
  const [open, setOpen] = useState(false);
  const { isPending, mutateAsync } = useMutation({
    mutationFn: () => rejectOrder({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Order status changed");
    },
    onError: (e: AxiosError) => {
      toast.error(parseError(e));
    },
  });

  const onProceed = () => {
    setOpen(false);
    mutateAsync();
  };

  return (
    <>
      <Button
        loading={isPending}
        text={!isPending && <>Reject Order Request</>}
        className={
          "text-sm h-10 rounded-[0.25rem] text-nowrap w-40 bg-red-600 "
        }
        onClick={() => setOpen(true)}
      />
      {open && (
        <ConfirmDialouge
          message="Are you sure you want to reject this order request and issue a refund?"
          onProceed={onProceed}
          onCancel={() => setOpen(false)}
          setOpen={setOpen}
        />
      )}
    </>
  );
};
