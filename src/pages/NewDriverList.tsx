import Layout from "@/components/Layout";
import NavbarAlt from "@/components/NavbarAlt";
import filtericon from "@/assets/images/filtericon.png";
import ReplayIcon from "@/assets/images/ic-replay-24px.png";
import CustomSelect from "@/components/CustomSelect";
import { useQuery } from "@tanstack/react-query";
import { days, availabiltys, carTypes } from "@/lib/Constants";
import { useState } from "react";
import { getDrivers } from "@/apis/drivers";
import Pagination from "@/components/Pagination";
import NewDriverCard from "@/components/Driver/NewDriverCard";
import { NewDriverCardLoading } from "@/components/Driver/NewDriverCardLoading";
import { ExportCurve } from "iconsax-react";
import { exportToExcel } from "react-json-to-excel";
import { parseError } from "@/lib/utils";
import { toast } from "sonner";
import Button from "@/components/Button";

export default function NewDriverList() {
  const limit = 3;
  const initialQuery = {
    status: ["PENDING"],
    page: 0,
    limit,
    carTypes: [],
    availabiltys: [],
    days: [],
  };
  const [query, setQuery] = useState(initialQuery);

  const { isPending, data, refetch } = useQuery({
    queryKey: ["newdrivers", query],
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

  const [csvLoading, setCsvLoading] = useState(false);
  const exportDataToCsv = async () => {
    try {
      setCsvLoading(true);
      const { data } = await getDrivers({
        ...query,
        limit: total + 1,
        page: 0,
      });
      setCsvLoading(false);
      if (data) {
        const csvDataToExport = data.data?.map((v: any) => ({
          Picture: v.image,
          "Full Name": `${v.firstName} ${v.lastName}`,
          Email: v.email,
          "Phone Number": v.phoneNumber,
          Days: v.availabiltyDays.map((v: any, i: any) => (
            <div key={i}> {v.toLowerCase()}</div>
          )),
          Availability: v.availabiltyTime
            .map(
              (time: any) =>
                availabiltys.find((val: any) => val.value == time)?.label
            )
            .join(","),
          Provinces: v.provinces?.join(","),
          Cities: v.cities.map((v: any) => v.name).join(","),
          "Car Type": carTypes.find((val: any) => val.value == v.vehicleType)
            ?.label,
        }));
        exportToExcel(csvDataToExport, "Drivers");
      } else toast.error("An error occured");
    } catch (error) {
      // console.info({ error });
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
            Add New Driver
          </div>
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
        {isPending ? (
          <div className="flex flex-wrap mt-6 justify-between">
            {[1, 2, 3].map((v: any) => (
              <NewDriverCardLoading key={v} />
            ))}
          </div>
        ) : (
          <>
            <div className="flex flex-wrap mt-6 justify-between">
              {values.map((v: any) => (
                <NewDriverCard data={v} key={v._id} refetch={refetch} />
              ))}
            </div>

            {total > 0 && (
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
