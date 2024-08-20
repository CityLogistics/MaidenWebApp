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
import Pagination from "./Pagination";
import { limit } from "@/lib/Constants";

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
                      key={i}
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
                  <TableRow key={i}>
                    {columns.map((column: ColumnType, i) => (
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
          </>
        )}
      </div>
      {showPagination && (
        <Pagination
          handlePageChange={handlePageChange}
          loading={loading}
          page={page}
          limit={limit}
          total={total}
        />
      )}
    </>
  );
}
