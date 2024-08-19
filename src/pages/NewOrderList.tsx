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
import { orderTpes } from "@/lib/Constants";

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
        <div
          onClick={() => setOpen(item._id)}
          className="text-[#358C9D] font-semibold text-sm flex items-center bg-white cursor-pointer text-nowrap"
        >
          Assign to Driver
        </div>
      ),
    },
  ];
  const query = {
    page: 0,
    limit: 5,
  };
  const { isPending, data } = useQuery({
    queryKey: ["newOrders"],
    queryFn: () => getNewOrders(query),
  });

  const values = data?.data.data ?? [];

  const moreData = [...values, ...values, ...values];

  return (
    <Layout>
      <NavbarAlt />
      <div className="p-[2.5rem]">
        <div className="flex justify-between items-center">
          <div className=" text-primary font-bold text-[2.5rem]">
            New Orders
          </div>
        </div>
        <div className="flex h-[4.375rem] w-fit bg-white rounded-xl items-center child:border-r-[0.1px] child:h-full child:px-6 child:flex child:text-sm child:font-bold child:items-center child:text-black border border-[#D5D5D5] mt-8">
          <div className="flex">
            <img src={filtericon} alt="filter icon" />
          </div>
          <div className="">Filter By</div>
          <div className="">
            <CustomDatePicker />{" "}
          </div>
          <div className="">
            <CustomSelect label="Order Type" items={orderTpes} />
          </div>
          {/* <div className="">
            <CustomSelect label="Order Status" items={orderTpes} />
          </div> */}
          <div>
            <img src={ReplayIcon} alt="Replay Icon " />
            <span className="text-[#EA0234] font-bold text-sm">
              Reset Filter
            </span>
          </div>
        </div>

        <div className=" mt-8">
          <CustomTable columns={columns} data={moreData} />
        </div>
      </div>
      {open && <AsignToDriver open={open} orderId={open} setOpen={setOpen} />}
    </Layout>
  );
}
