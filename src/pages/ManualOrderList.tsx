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
import { getManualOrders } from "@/apis/orders";
import { format } from "date-fns";
import { limit, orderStatus, orderTpes } from "@/lib/Constants";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { exportToExcel } from "react-json-to-excel";

import OrderDialogue from "@/components/OrderDialogue";
import { toast } from "sonner";
import { getVehicleLabel, parseError } from "@/lib/utils";
import { ExportCurve } from "iconsax-react";

export default function ManualOrderList() {
  const [moreOpen, setMoreOpen] = useState<any>();
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

  const columns = [
    {
      id: "orderNo",
      label: "Order ",
      width: "200px",
    },
    {
      id: "senderName",
      label: "Customer’s Name",
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
      id: "pickupAddress",
      label: "Pickup City",
      width: "200px",
      render: (v: any) => `${v.pickupAddress.city}`,
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
      id: "dropOffAddress",
      label: "Dropoff City",
      width: "200px",
      render: (v: any) => `${v.dropOffAddress.city}`,
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
      render: (v: any) => (
        <span className=" text-nowrap">
          {" "}
          {format(v.pickupDate, "dd MMMM YYY")}
        </span>
      ),
    },
    // {
    //   id: "",
    //   label: "Distance (KM)",
    //   width: "200px",
    //   render: (v: any) => v.distance,
    // },
    // {
    //   id: "totalPrice",
    //   label: "Total Price ($)",
    //   width: "200px",
    //   render: (v: any) => v.totalPrice / 100,
    // },
    // {
    //   id: "",
    //   label: "Status",
    //   width: "200px",
    //   className: "text-center",
    //   render: (item: any) => (
    //     <div className="flex justify-center">{getStatusLabel(item.status)}</div>
    //   ),
    // },
    // {
    //   id: "",
    //   label: "Action",
    //   width: "200px",
    //   className: "text-center",
    //   render: (item: any) => (
    //     <div className="flex justify-center">
    //       {/* {getStatusAction(item.status, item._id)} */}
    //       {item.status !== "PENDING_PAYMENT" && (
    //         <MoreHorizontal
    //           style={{ cursor: "pointer" }}
    //           onClick={() => setMoreOpen(item)}
    //         />
    //       )}
    //     </div>
    //   ),
    // },
  ];

  const initialQuery = {
    page: 0,
    limit,
    orderTypes: [],
    orderStatus: [],
    dates: [],
    search: "",
  };
  const [query, setQuery] = useState(initialQuery);

  const { isPending, data } = useQuery({
    queryKey: ["orders", query],
    queryFn: () => getManualOrders(query),
  });

  const values = data?.data.data ?? [];

  const total = data?.data?.count;

  const handleParamChange = (field: any, val: any) => {
    if (field == "orderStatus") setQuery((v) => ({ ...v, orderStatus: val }));
    if (field == "orderTypes") setQuery((v) => ({ ...v, orderTypes: val }));
    if (field == "dates") setQuery((v) => ({ ...v, dates: val }));
    if (field == "page") setQuery((v) => ({ ...v, page: val }));
  };

  const [csvLoading, setCsvLoading] = useState(false);
  const exportDataToCsv = async () => {
    try {
      setCsvLoading(true);
      const { data } = await getManualOrders({
        ...query,
        limit: total + 1,
        page: 0,
      });
      setCsvLoading(false);
      if (data) {
        const csvDataToExport = data.data?.map((item: any) => ({
          Order: item.orderNo,
          "Customer’s Name": item.senderName,
          "Customer’s Email": item.email,
          "Recipient's Name": item.recipientName,
          "Transaction Date": item.createdAt,
          "Pickup Date":
            item.pickupDate && format(item.pickupDate, "dd MMMM YYY"),
          "Pickup Time": item.pickuptime,
          // "Distance (KM)": item.distance,
          // "Base Price ($)": item.basePrice / 100,
          // "Total Price ($)": item.totalPrice / 100,
          // "Assigned Driver": `${item?.driver?.firstName} ${item?.driver?.lastName}`,
          "Vehicle Type": getVehicleLabel(item?.vehicleType),
          Status: getStatusLabel(item?.status),
          "Pickup Phone": item.pickupPhoneNumber,
          "Dropoff Phone": item.dropOffPhoneNumber,
          "Pickup Province": item.pickupAddress.province,
          "Dropoff Province": item.dropOffAddress.province,
          "Pickup Location": item.pickupAddress.pickupAddress,
          "Dropoff Location": item.dropOffAddress.address,
          "Pickup City": item.pickupAddress.city,
          "Dropoff City": item.dropOffAddress.city,
          // "Transaction Reference": item.tranasctionReference,
        }));
        exportToExcel(csvDataToExport, "Orders");
      } else toast.error("An error occured");
    } catch (error) {
      console.info({ error });
      setCsvLoading(false);
      toast.error(parseError(error));
    }
  };

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const t = setTimeout(() => {
      setQuery({ ...query, search: searchText });
    }, 5000);

    return () => clearTimeout(t);
  }, [searchText]);

  return (
    <Layout>
      <NavbarAlt />
      <div className="p-[1rem] sm:p-[2.5rem]">
        <div className="flex justify-between items-center">
          <div className=" text-primary font-bold text-[2.5rem]">
            Manual Order List
          </div>
        </div>

        <div className="flex h-[3.5rem] w-fit bg-white rounded-xl items-center child:border-r-[0.1px] child:h-full child:px-6 child:flex child:text-sm child:font-bold child:items-center child:text-black border border-[#D5D5D5]  max-w-full overflow-auto text-nowrap">
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
        <div className="flex flex-col md:flex-row md:justify-between w-full items-end md:items-center mt-8  ">
          <div className="relative md:max-w-[400px] w-full md:w-[95%]">
            <div className="absolute h-full flex items-center px-2">
              <Search className=" text-gray-400" />
            </div>
            <input
              type={"text"}
              className="block  w-full rounded-xl  h-12  bg-[#F1F4F9] border-0  pl-10 pr-20 text-black disabled:text-gray-400 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black text-base sm:text-sm sm:leading-6 base-input"
              style={{ backgroundColor: "#F1F4F9" }}
              placeholder="search"
              onChange={(e) => setSearchText(e.target.value)}
              onBlur={(e) => {
                setSearchText(e.target.value);
                setQuery({ ...query, search: e.target.value });
              }}
              value={searchText}
            />
          </div>
          <Button
            loading={csvLoading}
            text={
              <div className="flex items-center  ">
                Export <ExportCurve size={15} className="ml-2" />{" "}
              </div>
            }
            onClick={exportDataToCsv}
            className={
              "text-sm h-10 rounded-[0.25rem] text-nowrap w-[9.375rem] mt-4 md:mt-0"
            }
          />
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
      {moreOpen != null && (
        <OrderDialogue order={moreOpen} onCancel={() => setMoreOpen(null)} />
      )}
    </Layout>
  );
}
