import Button from "@/components/Button";
import Layout from "@/components/Layout";
import NavbarAlt from "@/components/NavbarAlt";
import filtericon from "@/assets/images/filtericon.png";
import ReplayIcon from "@/assets/images/ic-replay-24px.png";
import CustomTable from "@/components/CustomTable";
import { twMerge } from "tailwind-merge";
import { CustomDatePicker } from "@/components/CustomDatePicker";
import CustomSelect from "@/components/CustomSelect";

export default function OrderList() {
  const getStatusLabel = (status: any) => {
    const classNames =
      "w-[102.07px] h-[27px] rounded-[13.50px] flex justify-center items-center text-white text-sm font-bold";

    switch (status) {
      case "Delivered":
        return (
          <div className={twMerge("bg-[#00b69b]", classNames)}>{status}</div>
        );
      case "Rejected":
        return (
          <div className={twMerge("bg-[#fd5454]", classNames)}>{status}</div>
        );

      default:
        return (
          <div className={twMerge("bg-[#fcbe2d]", classNames)}>{status}</div>
        );
    }
  };
  const columns = [
    {
      id: "id",
      label: "Package ID",
      width: "200px",
    },
    {
      id: "name",
      label: "Name",
      width: "200px",
    },
    {
      id: "pickup_location",
      label: "Pickup Location",
      width: "200px",
    },
    {
      id: "time",
      label: "Time",
      width: "200px",
    },
    {
      id: "date",
      label: "Date",
      width: "200px",
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
  const data = [
    {
      id: "Order #12345",
      name: "Christine Brooks",
      pickup_location: "6096 Marjolaine Landing",
      time: "8 am",
      date: "15/07/2024",
      status: "Delivered",
    },
    {
      id: "Order #12345",
      name: "Christine Brooks",
      pickup_location: "6096 Marjolaine Landing",
      time: "8 am",
      date: "15/07/2024",
      status: "Pending",
    },
    {
      id: "Order #12345",
      name: "Christine Brooks",
      pickup_location: "6096 Marjolaine Landing",
      time: "8 am",
      date: "15/07/2024",
      status: "Rejected",
    },
  ];

  const moreData = [...data, ...data, ...data];

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
            />
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
            Order Type
            <CustomSelect />
          </div>
          <div className="">Order Status</div>
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
    </Layout>
  );
}
