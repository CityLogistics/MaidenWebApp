import Button from "@/components/Button";
import Layout from "@/components/Layout";
import NavbarAlt from "@/components/NavbarAlt";
import filtericon from "@/assets/images/filtericon.png";
import ReplayIcon from "@/assets/images/ic-replay-24px.png";
import CustomTable from "@/components/CustomTable";
import { twMerge } from "tailwind-merge";
import { CustomDatePicker } from "@/components/CustomDatePicker";
import CustomSelect from "@/components/CustomSelect";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getOrders, updateOrderStatus } from "@/apis/orders";
import { format } from "date-fns";
import { limit, orderStatus, orderTpes, ROLE } from "@/lib/Constants";
import { useState } from "react";
import { newOrdersRoute } from "@/router";
import { useNavigate } from "@tanstack/react-router";
import { CheckIcon, X } from "lucide-react";
import { parseError, queryClient } from "@/lib/utils";
import { toast } from "sonner";
import { AxiosError } from "axios";
import ConfirmDialouge from "@/components/ConfirmDialouge";
import { useUserStore } from "@/store/user";
import { decideOrderAssignment, updateDriverOrderStatus } from "@/apis/drivers";

export default function OrderList() {
  const role = useUserStore((state) => state.user.role);

  const getStatusLabel = (data: any) => {
    const status = data.toLowerCase();
    const classNames =
      "w-[150px] h-[27px] rounded-[5px] flex justify-center items-center text-white text-sm font-bold bg-opacity-20 capitalize";

    switch (data) {
      case "COMPLETED":
        return (
          <div className={twMerge(classNames, "bg-[#00b69b]  text-[#00b69b]")}>
            {status}
          </div>
        );

      case "ASSIGNED":
        return (
          <div className={twMerge(classNames, "bg-[#f1cf90]  text-[#FFA500]")}>
            {status}
          </div>
        );
      case "DELIVERED":
        return (
          <div className={twMerge(classNames, "bg-[#6b88f2]  text-[#0027b6]")}>
            {status}
          </div>
        );
      case "REJECTED":
        return (
          <div className={twMerge(classNames, "bg-[#fd5454] text-[#fd5454]")}>
            {status}
          </div>
        );

      case "PENDING_PAYMENT":
        return (
          <div className={twMerge(classNames, "bg-[#fcbe2d] text-[#fcbe2d] ")}>
            Pending Payment
          </div>
        );

      default:
        return (
          <div className={twMerge(classNames, "bg-[#fcbe2d] text-[#fcbe2d] ")}>
            {status}
          </div>
        );
    }
  };

  const getStatusAction = (status: any, id: any) => {
    if (
      status == "DELIVERED" &&
      (role == ROLE.ADMIN || role == ROLE.SUPER_ADMIN)
    )
      return <MarkComplete id={id} />;

    if (status == "PROCESSING" && role == "DRIVER")
      return <MarkDelivered id={id} />;

    if (status == "ASSIGNED" && role == "DRIVER")
      return (
        <div className="">
          <AcceptRequest id={id} />
          <div className="h-1" />
          <RejectRequest id={id} />
        </div>
      );

    return "";
  };

  const columns = [
    {
      id: "_id",
      label: "Package ID",
      width: "200px",
    },
    {
      id: "senderName",
      label: "Name",
      width: "200px",
      render: (v: any) => <div className=" text-nowrap">{v.senderName}</div>,
    },
    {
      id: "pickupAddress",
      label: "Pickup Location",
      width: "200px",
      render: (v: any) => `${v.pickupAddress.address}`,
    },
    {
      id: "pickupAddress",
      label: "Pickup Province",
      width: "200px",
      render: (v: any) => `${v.pickupAddress.province}`,
    },
    {
      id: "dropOffAddress",
      label: "Dropoff Location",
      width: "200px",
      render: (v: any) => `${v.dropOffAddress.address}`,
    },
    {
      id: "dropOffAddress",
      label: "Dropoff Province",
      width: "200px",
      render: (v: any) => `${v.dropOffAddress.province}`,
    },
    {
      id: "pickupDate",
      label: "Time",
      width: "200px",
      render: (v: any) => (
        <div className=" text-nowrap">
          {v.pickupDate && format(v.pickupDate, "hh a")}
        </div>
      ),
    },
    {
      id: "date",
      label: "Date",
      width: "200px",
      render: (v: any) => format(v.pickupDate, "dd/MM/YYY"),
    },
    {
      id: "pickupDate",
      label: "Distance (KM)",
      width: "200px",
      render: (v: any) => v.distance,
    },
    {
      id: "",
      label: "Status",
      width: "200px",
      className: "text-center",
      render: (item: any) => (
        <div className="flex justify-center">{getStatusLabel(item.status)}</div>
      ),
    },
    {
      id: "",
      label: "Action",
      width: "200px",
      className: "text-center",
      render: (item: any) => (
        <div className="flex justify-center">
          {getStatusAction(item.status, item._id)}
        </div>
      ),
    },
  ];

  const initialQuery = {
    page: 0,
    limit,
    orderTypes: [],
    orderStatus: [],
    dates: [],
  };
  const [query, setQuery] = useState(initialQuery);

  const { isPending, data } = useQuery({
    queryKey: ["orders", query],
    queryFn: () => getOrders(query),
  });

  const values = data?.data.data ?? [];

  const total = data?.data?.count;

  const handleParamChange = (field: any, val: any) => {
    if (field == "orderStatus") setQuery((v) => ({ ...v, orderStatus: val }));
    if (field == "orderTypes") setQuery((v) => ({ ...v, orderTypes: val }));
    if (field == "dates") setQuery((v) => ({ ...v, dates: val }));
    if (field == "page") setQuery((v) => ({ ...v, page: val }));
  };

  const navigate = useNavigate();

  return (
    <Layout>
      <NavbarAlt />
      <div className="p-[1rem] sm:p-[2.5rem]">
        <div className="flex justify-between items-center">
          <div className=" text-primary font-bold text-[2.5rem]">
            Order List
          </div>
          {role == "SUPER_ADMIN" ||
            (role == "ADMIN" && (
              <div className="w-[9.375rem]">
                <Button
                  text="View New Orders"
                  className={"text-sm h-10 rounded-[0.25rem] text-nowrap"}
                  onClick={() => navigate({ to: newOrdersRoute.to })}
                />
              </div>
            ))}
        </div>

        <div className="flex h-[3.5rem] w-fit bg-white rounded-xl items-center child:border-r-[0.1px] child:h-full child:px-6 child:flex child:text-sm child:font-bold child:items-center child:text-black border border-[#D5D5D5] mt-8 max-w-full overflow-auto text-nowrap">
          <div className="flex">
            <img src={filtericon} alt="filter icon" />
          </div>
          <div className="">Filter By</div>
          <div className="">
            <CustomDatePicker
              onChange={(v: any) => handleParamChange("dates", v)}
              values={query.dates}
            />{" "}
          </div>
          <div className="">
            <CustomSelect
              label=" Order Type"
              items={orderTpes}
              onChange={(v: any) => handleParamChange("orderTypes", v)}
              values={query.orderTypes}
            />
          </div>
          <div className="">
            <CustomSelect
              label=" Order Status"
              items={orderStatus}
              onChange={(v: any) => handleParamChange("orderStatus", v)}
              values={query.orderStatus}
            />
          </div>
          <div>
            <div
              className=" flex cursor-pointer"
              onClick={() => setQuery(initialQuery)}
            >
              <img src={ReplayIcon} alt="Replay Icon " />
              <span className="text-[#EA0234] font-bold text-sm ml-1">
                Reset Filter
              </span>
            </div>
          </div>
        </div>

        <div className=" mt-8 pagination">
          <CustomTable
            columns={columns}
            data={values}
            loading={isPending}
            page={query.page}
            total={total}
            handlePageChange={(v: any) => handleParamChange("page", v)}
          />
        </div>
      </div>
    </Layout>
  );
}

const MarkComplete = ({ id }: any) => {
  const [open, setOpen] = useState(false);
  const { isPending, mutateAsync } = useMutation({
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
        className={"text-sm h-7 rounded-[0.25rem] text-nowrap w-40 "}
        onClick={() => setOpen(true)}
      />
      {open && (
        <ConfirmDialouge
          message="Mark order as completed"
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
        className={"text-sm h-7 rounded-[0.25rem] text-nowrap w-40 "}
        onClick={() => setOpen(true)}
      />
      {open && (
        <ConfirmDialouge
          message="Mark order as delivered"
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
        className={"text-sm h-7 rounded-[0.25rem] text-nowrap w-40 "}
        onClick={() => setOpen(true)}
      />
      {open && (
        <ConfirmDialouge
          message="Accept order assignment"
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
        className={"text-sm h-7 rounded-[0.25rem] text-nowrap w-40 bg-red-300 "}
        onClick={() => setOpen(true)}
      />
      {open && (
        <ConfirmDialouge
          message="Reject order assignment"
          onProceed={onProceed}
          onCancel={() => setOpen(false)}
          setOpen={setOpen}
        />
      )}
    </>
  );
};
