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
// import AsignToDriver from "@/components/Order/AsignToDriver";
import { useState } from "react";
import { limit, orderTpes } from "@/lib/Constants";
// import { parseError, queryClient } from "@/lib/utils";
// import { toast } from "sonner";
// import { AxiosError } from "axios";
// import Button from "@/components/Button";
// import ConfirmDialouge from "@/components/ConfirmDialouge";
import OrderDialogue from "@/components/OrderDialogue";
import { MoreHorizontal } from "lucide-react";
import { getVehicleLabel, parseError } from "@/lib/utils";
import { toast } from "sonner";
import { exportToExcel } from "react-json-to-excel";
import Button from "@/components/Button";
import { ExportCurve } from "iconsax-react";

export default function NewOrderList() {
  const [moreOpen, setMoreOpen] = useState<any>();

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
    },
    {
      id: "pickupAddress",
      label: "Pickup Location",
      width: "200px",
      render: (v: any) => `${v.pickupAddress.address}`,
    },
    // {
    //   id: "pickupAddress",
    //   label: "Pickup Province",
    //   width: "200px",
    //   render: (v: any) => `${v.pickupAddress.province}`,
    // },
    {
      id: "dropOffAddress",
      label: "Dropoff Location",
      width: "200px",
      render: (v: any) => `${v.dropOffAddress.address}`,
    },
    // {
    //   id: "dropOffAddress",
    //   label: "Dropoff Province",
    //   width: "200px",
    //   render: (v: any) => `${v.dropOffAddress.province}`,
    // },
    // {
    //   id: "pickupDate",
    //   label: "Time",
    //   width: "200px",
    //   render: (v: any) => format(v.pickupDate, "hh a"),
    // },
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
    {
      id: "pickupDate",
      label: "Distance (KM)",
      width: "200px",
      render: (v: any) => v.distance ?? "N/A",
    },

    {
      id: "totalPrice",
      label: "Total Price ($)",
      width: "200px",
      render: (v: any) => v.totalPrice / 100,
    },
    {
      id: "",
      label: "Action",
      width: "200px",
      className: "text-center",
      render: (item: any) => (
        <div className=" flex flex-col items-center">
          {/* <div
            onClick={() => setMoreOpen(item)}
            className="text-[#358C9D] font-semibold text-sm flex items-center bg-white cursor-pointer text-nowrap"
          >
            Assign to Driver
          </div> */}
          <MoreHorizontal
            style={{ cursor: "pointer" }}
            onClick={() => setMoreOpen(item)}
          />
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

  const { isPending, data } = useQuery({
    queryKey: ["newOrders", query],
    queryFn: () => getNewOrders(query),
  });

  const values = data?.data.data ?? [];
  const total = data?.data?.count ?? [];

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
      const { data } = await getNewOrders({
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
          "Distance (KM)": item.distance,
          "Base Price ($)": item.basePrice / 100,
          "Total Price ($)": item.totalPrice / 100,
          "Assigned Driver": `${item?.driver?.firstName} ${item?.driver?.lastName}`,
          "Vehicle Type": getVehicleLabel(item?.vehicleType),
          "Pickup Phone": item.pickupPhoneNumber,
          "Dropoff Phone": item.dropOffPhoneNumber,
          "Pickup Province": item.pickupAddress.province,
          "Dropoff Province": item.dropOffAddress.province,
          "Pickup Location": item.pickupAddress.pickupAddress,
          "Dropoff Location": item.dropOffAddress.address,
          "Transaction Reference": item.tranasctionReference,
        }));
        exportToExcel(csvDataToExport, "Orders");
      } else toast.error("An error occured");
    } catch (error) {
      setCsvLoading(false);
      toast.error(parseError(error));
    }
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

        <div className="flex  w-full justify-end mt-8  ">
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
      {moreOpen != null && (
        <OrderDialogue
          order={moreOpen}
          onCancel={() => setMoreOpen(null)}
          setOpen={setMoreOpen}
        />
      )}
    </Layout>
  );
}

// {open && (
//   <AsignToDriver
//     open={open}
//     orderId={open._id}
//     setOpen={setOpen}
//     refetch={refetch}
//     orderCityId={open.assignedCityId}
//   />
// )}

{
  /* <RejectOrder id={item._id} /> */
}

// const RejectOrder = ({ id }: any) => {
//   const [open, setOpen] = useState(false);
//   const { isPending, mutateAsync } = useMutation({
//     mutationFn: () => rejectOrder({ id }),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["orders"] });
//       toast.success("Order status changed");
//     },
//     onError: (e: AxiosError) => {
//       toast.error(parseError(e));
//     },
//   });

//   const onProceed = () => {
//     setOpen(false);
//     mutateAsync();
//   };

//   return (
//     <>
//       <Button
//         loading={isPending}
//         text={!isPending && <>Reject Order Request</>}
//         className={
//           "text-sm h-7 rounded-[0.25rem] text-nowrap   bg-transparent text-[#F68716]"
//         }
//         onClick={() => setOpen(true)}
//       />
//       {open && (
//         <ConfirmDialouge
//           message="Are you sure you want to reject this order request and issue a refund?"
//           onProceed={onProceed}
//           onCancel={() => setOpen(false)}
//           setOpen={setOpen}
//         />
//       )}
//     </>
//   );
// };
