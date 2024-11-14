import Layout from "@/components/Layout";
import NavbarAlt from "@/components/NavbarAlt";
import filtericon from "@/assets/images/filtericon.png";
import ReplayIcon from "@/assets/images/ic-replay-24px.png";
import CustomTable from "@/components/CustomTable";
import { twMerge } from "tailwind-merge";
import { CustomDatePicker } from "@/components/CustomDatePicker";
import CustomSelect from "@/components/CustomSelect";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { limit, transactionStatus, transactionTypes } from "@/lib/Constants";
import { useState } from "react";
import { formatCurrencyvalue, parseError } from "@/lib/utils";
import { getTransactions } from "@/apis/transactions";
import Button from "@/components/Button";
import { ExportCurve } from "iconsax-react";
import { toast } from "sonner";
import { exportToExcel } from "react-json-to-excel";

export default function TransactionList() {
  const getStatusLabel = (data: any) => {
    const status = data.toLowerCase();
    const classNames =
      "w-[150px] h-[27px] rounded-[5px] flex justify-center items-center text-white text-sm font-bold bg-opacity-20 capitalize";

    switch (data) {
      case "SUCCESSFULL":
        return (
          <div className={twMerge(classNames, "bg-[#00b69b]  text-[#00b69b]")}>
            {status}
          </div>
        );
      case "FAILED":
        return (
          <div className={twMerge(classNames, "bg-[#fd5454] text-[#fd5454]")}>
            {status}
          </div>
        );

      case "PENDING":
        return (
          <div className={twMerge(classNames, "bg-[#fcbe2d] text-[#fcbe2d] ")}>
            Pending
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
      id: "refrence",
      label: "Reference",
      width: "200px",
    },
    {
      id: "orderId",
      label: "Order Id",
      width: "200px",
    },
    {
      id: "",
      label: "Amount",
      width: "200px",
      render: (v: any) => `${formatCurrencyvalue(v.amount)}`,
    },
    // {
    //   id: "paymentIntent",
    //   label: "Payment Intent",
    //   width: "200px",
    // },
    {
      id: "transactionType",
      label: "Transaction Type",
      width: "200px",
    },

    {
      id: "date",
      label: "Date",
      width: "200px",
      render: (v: any) => format(v.createdAt, "dd/MM/YYY | hh a"),
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
    // {
    //   id: "",
    //   label: "Action",
    //   width: "200px",
    //   className: "text-center",
    //   render: (item: any) => (
    //     <div className="flex justify-center">
    //       {getStatusAction(item.status, item._id)}
    //     </div>
    //   ),
    // },
  ];

  const initialQuery = {
    page: 0,
    limit,
    transactionType: [],
    status: [],
    dates: [],
  };
  const [query, setQuery] = useState(initialQuery);

  const { isPending, data } = useQuery({
    queryKey: ["transactions", query],
    queryFn: () => getTransactions(query),
  });

  const values = data?.data.data ?? [];

  const total = data?.data?.count;

  const handleParamChange = (field: any, val: any) => {
    if (field == "status") setQuery((v) => ({ ...v, status: val }));
    if (field == "transactionType")
      setQuery((v) => ({ ...v, transactionType: val }));
    if (field == "dates") setQuery((v) => ({ ...v, dates: val }));
    if (field == "page") setQuery((v) => ({ ...v, page: val }));
  };

  const [csvLoading, setCsvLoading] = useState(false);
  const exportDataToCsv = async () => {
    try {
      setCsvLoading(true);
      const { data } = await getTransactions({
        ...query,
        limit: total + 1,
        page: 0,
      });
      setCsvLoading(false);
      if (data) {
        const csvDataToExport = data.data?.map((item: any) => ({
          Reference: item.refrence,
          "Order ID": item.orderId,
          Amount: item.amount,
          "Transaction Type": item.transactionType,
          Date: item.createdAt,
          Status: item.status,
        }));
        exportToExcel(csvDataToExport, "Transactions");
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
            Transactions
          </div>
        </div>

        <div className="flex h-[3.5rem] w-fit bg-white rounded-xl items-center child:border-r-[0.1px] child:h-full child:px-6 child:flex child:text-sm child:font-bold child:items-center child:text-black border border-[#D5D5D5] mt-8 max-w-full overflow-auto text-nowrap">
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
              label=" Transaction Type"
              items={transactionTypes}
              onChange={(v: any) => handleParamChange("transactionType", v)}
              values={query.transactionType}
            />
          </div>
          <div className="">
            <CustomSelect
              label=" Transaction Status"
              items={transactionStatus}
              onChange={(v: any) => handleParamChange("status", v)}
              values={query.status}
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
        <div className="flex justify-end mt-8">
          <Button
            loading={csvLoading}
            text={
              <div className="flex items-center  ">
                Export <ExportCurve size={15} className="ml-2" />{" "}
              </div>
            }
            onClick={exportDataToCsv}
            className={
              "ml-2 text-sm h-10 rounded-[0.25rem] text-nowrap w-[9.375rem] mt-4 md:mt-0"
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
    </Layout>
  );
}
