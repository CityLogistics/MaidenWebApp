import { CustomDatePicker } from "@/components/CustomDatePicker";
import CustomSelect from "@/components/CustomSelect";
import CustomTable from "@/components/CustomTable";
import filtericon from "@/assets/images/filtericon.png";
import ReplayIcon from "@/assets/images/ic-replay-24px.png";
import Layout from "@/components/Layout";
import NavbarAlt from "@/components/NavbarAlt";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getNewOrders, updateOrderStatus } from "@/apis/orders";
import { format } from "date-fns";
import AsignToDriver from "@/components/Order/AsignToDriver";
import { useState } from "react";
import { limit, orderTpes } from "@/lib/Constants";
import { parseError, queryClient } from "@/lib/utils";
import { toast } from "sonner";
import { AxiosError } from "axios";
import Button from "@/components/Button";
import ConfirmDialouge from "@/components/ConfirmDialouge";

export default function NewOrderList() {
  const [open, setOpen] = useState();
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
      render: (v: any) => format(v.pickupDate, "hh a"),
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
      label: "Action",
      width: "200px",
      className: "text-center",
      render: (item: any) => (
        <div className=" flex flex-col items-center">
          <div
            onClick={() => setOpen(item._id)}
            className="text-[#358C9D] font-semibold text-sm flex items-center bg-white cursor-pointer text-nowrap"
          >
            Assign to Driver
          </div>
          <RejectOrder id={item._id} />
        </div>
      ),
    },
  ];

  const initialQuery = {
    page: 0,
    limit,
    orderTypes: [],
    dates: [],
  };

  const [query, setQuery] = useState(initialQuery);

  const { isPending, data, refetch } = useQuery({
    queryKey: ["newOrders", query],
    queryFn: () => getNewOrders(query),
  });

  const values = data?.data.data ?? [];
  const total = data?.data?.count ?? [];

  const handleParamChange = (field: any, val: any) => {
    console.info({ val });

    if (field == "orderStatus") setQuery((v) => ({ ...v, orderStatus: val }));
    if (field == "orderTypes") setQuery((v) => ({ ...v, orderTypes: val }));
    if (field == "dates") setQuery((v) => ({ ...v, dates: val }));
    if (field == "page") setQuery((v) => ({ ...v, page: val }));
  };

  return (
    <Layout>
      <NavbarAlt />
      <div className="p-[1rem] sm:p-[2.5rem]">
        <div className="flex justify-between items-center">
          <div className=" text-primary font-bold text-[2.5rem]">
            New Orders
          </div>
        </div>
        <div className="flex h-[4.375rem] w-fit bg-white rounded-xl items-center child:border-r-[0.1px] child:h-full child:px-6 child:flex child:text-sm child:font-bold child:items-center child:text-black border border-[#D5D5D5] mt-8 max-w-full overflow-auto text-nowrap">
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
              label="Order Type"
              items={orderTpes}
              onChange={(v: any) => handleParamChange("orderTypes", v)}
              values={query.orderTypes}
            />
          </div>
          {/* <div className="">
            <CustomSelect label="Order Status" items={orderTpes} />
          </div> */}
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

        <div className=" mt-8">
          <CustomTable
            columns={columns}
            data={values}
            loading={isPending}
            total={total}
            page={query.page}
            handlePageChange={(v: any) => handleParamChange("page", v)}
          />
        </div>
      </div>
      {open && (
        <AsignToDriver
          open={open}
          orderId={open}
          setOpen={setOpen}
          refetch={refetch}
        />
      )}
    </Layout>
  );
}

const RejectOrder = ({ id }: any) => {
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
        text={!isPending && <>Reject Order Request</>}
        className={
          "text-sm h-7 rounded-[0.25rem] text-nowrap   bg-transparent text-[#F68716]"
        }
        onClick={() => setOpen(true)}
      />
      {open && (
        <ConfirmDialouge
          message="Reject order request and issue refund"
          onProceed={onProceed}
          onCancel={() => setOpen(false)}
          setOpen={setOpen}
        />
      )}
    </>
  );
};
