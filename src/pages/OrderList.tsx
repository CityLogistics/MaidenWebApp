import Button from "@/components/Button";
import Layout from "@/components/Layout";
import NavbarAlt from "@/components/NavbarAlt";
import filtericon from "@/assets/images/filtericon.png";
import ReplayIcon from "@/assets/images/ic-replay-24px.png";
import CustomTable from "@/components/CustomTable";
import { twMerge } from "tailwind-merge";
import { CustomDatePicker } from "@/components/CustomDatePicker";
import CustomSelect from "@/components/CustomSelect";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "@/apis/orders";
import { format } from "date-fns";
import { limit, orderStatus, orderTpes } from "@/lib/Constants";
import { useState } from "react";
import { newOrdersRoute } from "@/router";
import { useNavigate } from "@tanstack/react-router";

export default function OrderList() {
  const getStatusLabel = (status: any) => {
    const classNames =
      "w-[102.07px] h-[27px] rounded-[5px] flex justify-center items-center text-white text-sm font-bold bg-opacity-20";

    switch (status) {
      case "COMPLETED":
        return (
          <div className={twMerge(classNames, "bg-[#00b69b]  text-[#00b69b]")}>
            {status}
          </div>
        );
      case "Rejected":
        return (
          <div className={twMerge(classNames, "bg-[#fd5454] text-[#fd5454]")}>
            {status}
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
    },
    {
      id: "dropOffAddress",
      label: "Dropoff Location",
      width: "200px",
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
      label: "Status",
      width: "200px",
      className: "text-center",
      render: (item: any) => (
        <div className="flex justify-center">{getStatusLabel(item.status)}</div>
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
    console.info({ val });

    if (field == "orderStatus") setQuery((v) => ({ ...v, orderStatus: val }));
    if (field == "orderTypes") setQuery((v) => ({ ...v, orderTypes: val }));
    if (field == "dates") setQuery((v) => ({ ...v, dates: val }));
    if (field == "page") setQuery((v) => ({ ...v, page: val }));
  };

  const navigate = useNavigate();

  return (
    <Layout>
      <NavbarAlt />
      <div className="p-[2.5rem]">
        <div className="flex justify-between items-center">
          <div className=" text-primary font-bold text-[2.5rem]">
            Order List
          </div>
          <div className="w-[9.375rem]">
            <Button
              text="View New Orders"
              className={"text-sm h-10 rounded-[0.25rem]"}
              onClick={() => navigate({ to: newOrdersRoute.to })}
            />
          </div>
        </div>
        <div className="flex h-[3.5rem] w-fit bg-white rounded-xl items-center child:border-r-[0.1px] child:h-full child:px-6 child:flex child:text-sm child:font-bold child:items-center child:text-black border border-[#D5D5D5] mt-8">
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
