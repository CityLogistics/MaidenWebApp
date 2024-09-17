import Button from "@/components/Button";
import Layout from "@/components/Layout";
import NavbarAlt from "@/components/NavbarAlt";
import filtericon from "@/assets/images/filtericon.png";
import ReplayIcon from "@/assets/images/ic-replay-24px.png";
import CustomSelect from "@/components/CustomSelect";
import { useQuery } from "@tanstack/react-query";
import { days, limit, availabiltys, carTypes } from "@/lib/Constants";
import { useState } from "react";
import { getDrivers } from "@/apis/drivers";
import Pagination from "@/components/Pagination";
import DriverCard from "@/components/Driver/DriverCard";
import DriverCardLoading from "@/components/Driver/DriverCardLoading";
import { useNavigate } from "@tanstack/react-router";
import { newDriversRoute } from "@/router";
import { GridIcon, ListIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";
import DriversTable from "@/components/Driver/DriversTable";
import { useUserStore } from "@/store/user";

export default function DriverList() {
  const role = useUserStore((state) => state.user.role);

  const initialQuery = {
    page: 0,
    limit,
    carTypes: [],
    availabiltys: [],
    days: [],
    status: "ACCEPTED",
  };
  const [query, setQuery] = useState(initialQuery);

  const { isPending, data } = useQuery({
    queryKey: ["drivers", query],
    queryFn: () => getDrivers(query),
  });

  const values = data?.data.data ?? [];

  const total = data?.data?.count;

  const handleParamChange = (field: any, val: any) => {
    if (field == "availabiltys") setQuery((v) => ({ ...v, availabiltys: val }));
    if (field == "carTypes") setQuery((v) => ({ ...v, carTypes: val }));
    if (field == "days") setQuery((v) => ({ ...v, days: val }));
    if (field == "page") setQuery((v) => ({ ...v, page: val }));
  };

  const navigate = useNavigate();

  const [view, setView] = useState("list");

  return (
    <Layout>
      <NavbarAlt />
      <div className="p-[1rem] sm:p-[2.5rem]">
        <div className="flex justify-between items-center">
          <div className=" text-primary font-bold text-[2.5rem]">
            Driver List
          </div>
          {role == "SUPER_ADMIN" && (
            <div className="w-50">
              <Button
                text="Approve Pending Driver"
                className={"text-sm h-10 rounded-[0.25rem] text-nowrap "}
                onClick={() => navigate({ to: newDriversRoute.to })}
              />
            </div>
          )}
        </div>

        <div className="flex h-[3.5rem] w-fit bg-white rounded-xl items-center child:border-r-[0.1px] child:h-full child:px-6 child:flex child:text-sm child:font-bold child:items-center child:text-black border border-[#D5D5D5] mt-8 max-w-full overflow-auto text-nowrap">
          <div className="flex">
            <img src={filtericon} alt="filter icon" />
          </div>
          <div className="">Filter By</div>
          <div className="">
            <CustomSelect
              label="Days"
              items={days}
              onChange={(v: any) => handleParamChange("days", v)}
              values={query.days}
            />
          </div>
          <div className="">
            <CustomSelect
              label="Car Type"
              items={carTypes}
              onChange={(v: any) => handleParamChange("carTypes", v)}
              values={query.carTypes}
            />
          </div>
          <div className="">
            <CustomSelect
              label="Availability"
              items={availabiltys}
              onChange={(v: any) => handleParamChange("availabiltys", v)}
              values={query.availabiltys}
              capsuleWidth={"45%"}
              containerWidth={"40"}
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
        <div className="flex w-full justify-end text-black">
          <div
            className={twMerge(
              "w-7 h-7 cursor-pointer  rounded flex justify-center items-center",
              view == "list" && "bg-primary text-white"
            )}
            onClick={() => setView("list")}
          >
            <ListIcon />
          </div>
          <div
            className={twMerge(
              "w-7 h-7 cursor-pointer rounded flex justify-center items-center",
              view == "grid" && "bg-primary text-white"
            )}
            onClick={() => setView("grid")}
          >
            <GridIcon />
          </div>
        </div>
        {isPending ? (
          <div className="flex flex-wrap mt-6 justify-between">
            {[1, 2, 3, 4, 5, 6].map((v: any) => (
              <DriverCardLoading key={v._id} />
            ))}
          </div>
        ) : (
          <>
            {view == "list" ? (
              <div className=" mt-8">
                <DriversTable data={values} loading={isPending} />
              </div>
            ) : (
              <div className="flex flex-wrap mt-6 ">
                {values.map((v: any) => (
                  <DriverCard data={v} key={v._id} />
                ))}
              </div>
            )}

            {values?.length > 0 && (
              <Pagination
                handlePageChange={(v: any) => handleParamChange("page", v)}
                loading={isPending}
                page={query.page}
                limit={limit}
                total={total}
              />
            )}
          </>
        )}
      </div>
    </Layout>
  );
}
