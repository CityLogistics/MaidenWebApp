import Button from "@/components/Button";
import Layout from "@/components/Layout";
import NavbarAlt from "@/components/NavbarAlt";
import filtericon from "@/assets/images/filtericon.png";
import ReplayIcon from "@/assets/images/ic-replay-24px.png";
import CustomSelect from "@/components/CustomSelect";
import { useMutation, useQuery } from "@tanstack/react-query";
import { limit, regions } from "@/lib/Constants";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { addCitiesRoute } from "@/router";
import { useUserStore } from "@/store/user";
import { getCities, updateCityStatus } from "@/apis/cities";
import { format } from "date-fns";
import CustomTable from "@/components/CustomTable";
import { twMerge } from "tailwind-merge";
import { parseError, queryClient } from "@/lib/utils";
import { AxiosError } from "axios";
import { toast } from "sonner";
import ConfirmDialouge from "@/components/ConfirmDialouge";

export default function CityList() {
  const role = useUserStore((state) => state.user.role);

  const columns = [
    {
      id: "name",
      label: "City Name",
      width: "200px",
      render: (v: any) => <div className=" text-nowrap">{v.name}</div>,
    },
    {
      id: "province",
      label: "Province",
      width: "200px",
      render: (v: any) => {
        v.province;
      },
    },

    {
      id: "date",
      label: "Date",
      width: "200px",
      render: (v: any) => (
        <span className=" text-nowrap">
          {" "}
          {format(v.createdAt, "dd MMMM YYY")}
        </span>
      ),
    },

    {
      id: "",
      label: "Status",
      width: "200px",
      className: "text-center",
      render: (item: any) => (
        <div className="flex justify-center">
          {item.status ? "Enabled" : "Disabled"}
        </div>
      ),
    },
    {
      id: "",
      label: "Action",
      width: "200px",
      className: "text-center",
      render: (item: any) => (
        <div className="flex justify-center">
          <ToggleStatus item={item} />
        </div>
      ),
    },
  ];

  const initialQuery = {
    page: 0,
    limit,
    provinces: [],
  };
  const [query, setQuery] = useState(initialQuery);

  const { isPending, data } = useQuery({
    queryKey: ["citylists", query],
    queryFn: () => getCities(query),
  });

  const values = data?.data.data ?? [];
  //
  const total = data?.data?.count;

  const handleParamChange = (field: any, val: any) => {
    if (field == "provinces") setQuery((v) => ({ ...v, provinces: val }));
    if (field == "page") setQuery((v) => ({ ...v, page: val }));
  };

  const navigate = useNavigate();

  return (
    <Layout>
      <NavbarAlt />
      <div className="p-[1rem] sm:p-[2.5rem]">
        <div className="flex justify-between items-center">
          <div className=" text-primary font-bold text-[2.5rem]">City List</div>
          {role == "SUPER_ADMIN" && (
            <div className="w-50">
              <Button
                text="Add New City "
                className={"text-sm h-10 rounded-[0.25rem] text-nowrap "}
                onClick={() => navigate({ to: addCitiesRoute.to })}
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
              label="Province"
              items={regions}
              onChange={(v: any) => handleParamChange("provinces", v)}
              values={query.provinces}
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

        <>
          <div className=" mt-8">
            <CustomTable
              columns={columns}
              data={values}
              loading={isPending}
              page={query.page}
              total={total}
              handlePageChange={(v: any) => handleParamChange("page", v)}
            />
          </div>
        </>
      </div>
    </Layout>
  );
}

const ToggleStatus = ({ item }: any) => {
  const { _id, status } = item;
  const [open, setOpen] = useState(false);
  const { isPending, mutateAsync } = useMutation({
    mutationKey: ["updateCityStatus"],
    mutationFn: () => updateCityStatus({ id: _id, data: { status: !status } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["citylists"] });
      toast.success("City status changed");
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
      {isPending ? (
        <svg
          width="20"
          height="20"
          fill="currentColor"
          className="mr-2 animate-spin"
          viewBox="0 0 1792 1792"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"></path>
        </svg>
      ) : (
        <div
          className={twMerge(
            `relative inline-flex items-center h-6 w-11 rounded-full cursor-pointer transition-colors duration-300 ease-in-out bg-gray-300`,
            status && "bg-green-500"
          )}
          onClick={() => setOpen(true)}
        >
          <span
            className={twMerge(
              `inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300 ease-in-out translate-x-1`,
              status && "translate-x-6"
            )}
          />
        </div>
      )}
      {open && (
        <ConfirmDialouge
          message={`Are you sure you want to ${status ? "disable" : "enable"} this city?`}
          onProceed={onProceed}
          onCancel={() => setOpen(false)}
          setOpen={setOpen}
        />
      )}
    </>
  );
};
