import { ClassNameValue, twMerge } from "tailwind-merge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import Loader from "./Loader";
import { limit } from "@/lib/Constants";
import { Next, Previous } from "iconsax-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type ColumnType = {
  id: String;
  label: String;
  width: String;
  render?: Function;
  className?: ClassNameValue;
};

type PageProps = {
  columns: ColumnType[];
  data: any[];
  loading?: boolean;
  showPagination?: boolean;
  total: number;
  page: number;
  handlePageChange: any;
};

export default function CustomTable({
  columns = [],
  data = [],
  loading,
  showPagination = true,
  total = 0,
  page = 0,
  handlePageChange,
}: PageProps) {
  return (
    <>
      <div className="bg-white  rounded-2xl min-h-[20vh]">
        {loading ? (
          <div className="h-[20vh] flex justify-center items-center ">
            <Loader />
          </div>
        ) : (
          <>
            <Table className=" text-black rounded-2xl">
              <TableHeader className="[&_tr]:border-b-0 rounded-2xl  ">
                <TableRow className=" border-b-0">
                  {columns.map((column, i) => (
                    <TableHead
                      className={twMerge(
                        `w-[${column.width}] bg-[#FCFDFD] whitespace-nowrap font-bold `,
                        i == 0 && "rounded-l-2xl",
                        i == columns.length - 1 && "rounded-r-2xl",
                        column.className ?? ""
                      )}
                    >
                      {column.label}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((row, i): any => (
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
          </>
        )}
      </div>
      {showPagination && (
        <div className="flex w-full mt-5 items-center">
          {!loading && (
            <div className=" text-[#202224] opacity-60 text-sm">
              Showing {page * limit + 1}-{Math.min((page + 1) * limit, total)}{" "}
              of {total}
            </div>
          )}
          <div className="flex ml-auto">
            <button
              disabled={page == 0}
              onClick={() => handlePageChange(page - 1)}
              className={twMerge(
                "px-4 py-2 bg-white rounded-r-[0px]  rounded-l-[12px] border border-[#D5D5D5] border-r-white border-r-[0.1px] hover:border-primary text-[#202224]",
                page == 0 && "hover:border-[#D5D5D5] text-[#9499a0]"
              )}
            >
              <ChevronLeft />
            </button>
            <button
              disabled={(page + 1) * limit > total}
              onClick={() => handlePageChange(page + 1)}
              className={twMerge(
                "px-4 py-2 bg-white rounded-l-[0px] rounded-r-[12px]  border border-[#D5D5D5] border-l-[0.1px] hover:border-primary text-[#202224]",
                (page + 1) * limit > total &&
                  "hover:border-[#D5D5D5] text-[#9499a0]"
              )}
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
