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
import { getRecentOrders } from "@/apis/orders";
import { format } from "date-fns";
import Loader from "../Loader";
export default function RecentOrdersTable() {
  const { isPending, data } = useQuery({
    queryKey: ["todos"],
    queryFn: getRecentOrders,
  });

  const values = data?.data ?? [];

  console.info({ values });

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
    },
    {
      id: "pickupAddress",
      label: "Pickup Location",
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

  return (
    <div className="bg-white p-9 rounded-2xl">
      <div className=" font-bold text-[#202224] pb-5">Recent Orders</div>
      {isPending ? (
        <Loader />
      ) : (
        <Table className=" text-black rounded-2xl">
          <TableHeader className="[&_tr]:border-b-0  ">
            <TableRow className=" border-b-0">
              {columns.map((column, i) => (
                <TableHead
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
            {values.map((row, i): any => (
              <TableRow>
                {columns.map((column: ColumnType) => (
                  <TableCell className=" text-[#202224] font-semibold text-sm opacity-80">
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
