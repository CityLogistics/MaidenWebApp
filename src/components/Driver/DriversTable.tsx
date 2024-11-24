import { ClassNameValue, twMerge } from "tailwind-merge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Loader from "../Loader";
import { availabiltys, carTypes } from "@/lib/Constants";
import DeadState from "../DeadState";
import DeleteDriver from "./DeleteDriver";

export default function DriversTable({ data = [], loading }: any) {
  type ColumnType = {
    id: string;
    label: String;
    width: String;
    render?: Function;
    className?: ClassNameValue;
  };

  const getStatusLabel = (data: any) => {
    const status = data.toLowerCase();
    const classNames =
      "w-[150px] h-[27px] rounded-[5px] flex justify-center items-center text-white text-sm font-bold bg-opacity-20 capitalize";

    switch (data) {
      case "ACCEPTED":
        return (
          <div className={twMerge(classNames, "bg-[#00b69b]  text-[#00b69b]")}>
            {status}
          </div>
        );

      case "DECLINED":
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
        <div className=" text-[#202224] whitespace-nowrap">{`${v.firstName} ${v.lastName}`}</div>
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
      render: (v: any) => `${v.phoneNumber}`,
    },
    {
      id: "date",
      label: "Days",
      width: "200px",
      render: (v: any) => (
        <div className=" capitalize ">
          {v.availabiltyDays.map((v: any, i: any) => (
            <div key={i}> {v.toLowerCase()}</div>
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
        <div className=" justify-center capitalize text-nowrap">
          {val.availabiltyTime.map((time: any) => (
            <div> {availabiltys.find((v: any) => v.value == time)?.label}</div>
          ))}
        </div>
      ),
    },
    {
      id: "date",
      label: "Provinces",
      width: "200px",
      render: (v: any) => (
        <div className=" capitalize ">
          {v.provinces.map((v: any, i: any) => (
            <div key={i}> {v}</div>
          ))}
        </div>
      ),
    },
    {
      id: "date",
      label: "Cities",
      width: "200px",
      render: (v: any) => (
        <div className=" capitalize ">
          {v.cities.map((v: any, i: any) => (
            <div key={i}> {v.name}</div>
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

    {
      id: "status",
      label: "Status",
      width: "200px",
      className: "text-center",
      render: (val: any) => (
        <div className="flex justify-center">{getStatusLabel(val.status)}</div>
      ),
    },

    {
      id: "",
      label: "Action",
      width: "200px",
      className: "text-center",
      render: (val: any) => (
        <div className="flex justify-center capitalize text-nowrap">
          <DeleteDriver id={val._id} />
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
        <>
          {data?.length == 0 ? (
            <DeadState />
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
        </>
      )}
    </div>
  );
}
