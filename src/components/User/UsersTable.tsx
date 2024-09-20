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
import { ROLE } from "@/lib/Constants";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { parseError, queryClient } from "@/lib/utils";
import { deleteUser } from "@/apis/user";
import Button from "../Button";
import ConfirmDialouge from "../ConfirmDialouge";
import { useUserStore } from "@/store/user";
import { Trash } from "iconsax-react";
export default function UsersTable({ data = [], loading }: any) {
  const role = useUserStore((state) => state.user.role);

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
      id: "province",
      label: "Province",
      width: "200px",
      className: "text-center",
    },
    {
      id: "role",
      label: "Province",
      width: "200px",
      className: "text-center",
      render: (v: any) => (
        <span className=" whitespace-nowrap">{`${v.role?.replace("_", " ")}`}</span>
      ),
    },
  ];

  if (role == ROLE.SUPER_ADMIN)
    columns.push({
      id: "province",
      label: "Action",
      width: "200px",
      className: "text-center",
      render: (v: any) => <DeleteUser id={v._id} />,
    });

  return (
    <div className="bg-white p-9 rounded-2xl">
      <div className=" font-bold text-[#202224] pb-5">Users</div>
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

const DeleteUser = ({ id }: any) => {
  const [open, setOpen] = useState(false);
  const { isPending, mutateAsync } = useMutation({
    mutationFn: () => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userlists"] });
      toast.success("User deleted");
    },
    onError: (e: AxiosError) => {
      toast.error(parseError(e));
    },
  });

  const onProceed = () => {
    setOpen(false);
    mutateAsync();
  };

  return (
    <>
      <Button
        loading={isPending}
        text={
          !isPending && (
            <>
              Delete <Trash size={20} />
            </>
          )
        }
        className={"text-sm h-7 rounded-[0.25rem] text-nowrap w-40 bg-red-300 "}
        onClick={() => setOpen(true)}
      />
      {open && (
        <ConfirmDialouge
          message="Delete user"
          onProceed={onProceed}
          onCancel={() => setOpen(false)}
          setOpen={setOpen}
        />
      )}
    </>
  );
};
