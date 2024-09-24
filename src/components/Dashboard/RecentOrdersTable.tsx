import { ClassNameValue, twMerge } from "tailwind-merge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "@/apis/orders";
import { format } from "date-fns";
import Loader from "../Loader";
import { Link } from "@tanstack/react-router";
import { ordersRoute } from "@/router";
export default function RecentOrdersTable() {
  const query = {
    page: 0,
    limit: 5,
  };
  const { isPending, data } = useQuery({
    queryKey: ["recentOrders"],
    queryFn: () => getOrders(query),
  });

  const values = data?.data.data ?? [];

  const getStatusLabel = (data: any) => {
    const classNames =
      "w-[150px] h-[27px] rounded-[13.50px] flex justify-center items-center text-white text-sm font-bold capitalize";
    const status = data.toLowerCase();

    switch (data) {
      case "DELIVERED":
        return (
          <div className={twMerge("bg-[#00b69b]", classNames)}>{status}</div>
        );
      case "REJECTED":
        return (
          <div className={twMerge("bg-[#fd5454]", classNames)}>{status}</div>
        );

      case "PENDING_PAYMENT":
        return (
          <div className={twMerge(classNames, "bg-[#fcbe2d]  ")}>
            Pending Payment
          </div>
        );

      default:
        return (
          <div className={twMerge("bg-[#fcbe2d]", classNames)}>{status}</div>
        );
    }
  };

  type ColumnType = {
    id: string;
    label: String;
    width: String;
    render?: Function;
    className?: ClassNameValue;
  };

  const columns: ColumnType[] = [
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
  ];

  return (
    <div className="bg-white p-9 rounded-2xl">
      <div className="pb-5 flex justify-between  items-center">
        <div className=" font-bold text-[#202224] ">Recent Orders</div>

        <Link to={ordersRoute.to}>
          <div className="text-[#F68716] font-normal text-[0.625rem]">
            View All
          </div>
        </Link>
      </div>
      {isPending ? (
        <Loader />
      ) : (
        <Table className=" text-black rounded-2xl">
          <TableHeader className="[&_tr]:border-b-0  ">
            <TableRow className=" border-b-0">
              {columns.map((column, i) => (
                <TableHead
                  key={i}
                  className={twMerge(
                    `w-[${column.width}] bg-[#f1f3f9] whitespace-nowrap font-bold`,
                    i == 0 && "rounded-l-xl",
                    i == columns.length - 1 && "rounded-r-xl",
                    column.className ?? ""
                  )}
                >
                  {column.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {values.map((row: any, i: any): any => (
              <TableRow key={i}>
                {columns.map((column: ColumnType, i: number) => (
                  <TableCell
                    key={i}
                    className=" text-[#202224] font-semibold text-sm opacity-80"
                  >
                    {column.render?.(row) ?? row[column.id]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
