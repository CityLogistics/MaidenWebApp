import { ClassNameValue, twMerge } from "tailwind-merge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

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
};

export default function CustomTable({ columns = [], data = [] }: PageProps) {
  return (
    <div className="bg-white  rounded-2xl">
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
    </div>
  );
}
