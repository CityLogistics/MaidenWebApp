import { CustomDatePicker } from "@/components/CustomDatePicker";
import CustomSelect from "@/components/CustomSelect";
import CustomTable from "@/components/CustomTable";
import filtericon from "@/assets/images/filtericon.png";
import ReplayIcon from "@/assets/images/ic-replay-24px.png";
import Layout from "@/components/Layout";
import NavbarAlt from "@/components/NavbarAlt";
import { useQuery } from "@tanstack/react-query";
import { getNewOrders } from "@/apis/orders";
import { format } from "date-fns";
import AsignToDriver from "@/components/Order/AsignToDriver";
import { useState } from "react";
import { limit, orderTpes } from "@/lib/Constants";

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
      render: (v: any) =>
        `${v.pickupAddress.address}, ${v.pickupAddress.country}`,
    },
    {
      id: "dropOffAddress",
      label: "Dropoff Location",
      width: "200px",
      render: (v: any) =>
        `${v.dropOffAddress.address}, ${v.dropOffAddress.country}`,
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
      id: "",
      label: "Action",
      width: "200px",
      className: "text-center",
      render: (item: any) => (
        <div
          onClick={() => setOpen(item._id)}
          className="text-[#358C9D] font-semibold text-sm flex items-center bg-white cursor-pointer text-nowrap"
        >
          Assign to Driver
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
