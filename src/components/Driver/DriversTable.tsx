import { ClassNameValue, twMerge } from "tailwind-merge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { format } from "date-fns";
import Loader from "../Loader";
import { availabiltys, carTypes } from "@/lib/Constants";
export default function DriversTable({ data = [], loading }: any) {
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
      label: "Picture",
      width: "100px",
      render: (v: any) => (
        <div
          className=" h-12 w-12 rounded bg-slate-50  bg-cover "
          style={{ backgroundImage: `url(${v.image})` }}
        ></div>
      ),
    },
    {
      id: "_id",
      label: "Full Name",
      width: "200px",
      render: (v: any) => (
        <div className=" text-[#202224]">{`${v.firstName} ${v.lastName}`}</div>
      ),
    },
    {
      id: "email",
      label: "Email",
      width: "200px",
    },
    {
      id: "phoneNumber",
      label: "Phone Number",
      width: "200px",
      render: (v: any) => `+${v.phoneNumber}`,
    },
    {
      id: "date",
      label: "Days",
      width: "200px",
      render: (v: any) => (
        <div className=" capitalize">
          {v.availabiltyDays.map((v: any) => (
            <div> {v.toLowerCase()}</div>
          ))}
        </div>
      ),
    },
    {
      id: "",
      label: "Availability",
      width: "200px",
      className: "text-center",
      render: (val: any) => (
        <div className="flex justify-center capitalize text-nowrap">
          {val.availabiltyTime.map((time: any) => (
            <div> {availabiltys.find((v: any) => v.value == time)?.label}</div>
          ))}
        </div>
      ),
    },
    {
      id: "",
      label: "Car Type",
      width: "200px",
      className: "text-center",
      render: (val: any) => (
        <div className="flex justify-center capitalize text-nowrap">
          {carTypes.find((v: any) => v.value == val.vehicleType)?.label}
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white p-9 rounded-2xl">
      <div className=" font-bold text-[#202224] pb-5">Drivers</div>
      {loading ? (
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
            {data.map((row: any, i: any): any => (
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