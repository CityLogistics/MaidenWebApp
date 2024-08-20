import { ChevronLeft, ChevronRight } from "lucide-react";
import { twMerge } from "tailwind-merge";

export default function Pagination({
  handlePageChange,
  loading,
  page,
  limit,
  total,
}: any) {
  return (
    <div className="flex w-full mt-5 items-center">
      {!loading && (
        <div className=" text-[#202224] opacity-60 text-sm">
          Showing {page * limit + 1}-{Math.min((page + 1) * limit, total)} of{" "}
          {total}
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
  );
}
