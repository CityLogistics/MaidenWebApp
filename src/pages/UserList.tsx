import Button from "@/components/Button";
import Layout from "@/components/Layout";
import NavbarAlt from "@/components/NavbarAlt";
import filtericon from "@/assets/images/filtericon.png";
import ReplayIcon from "@/assets/images/ic-replay-24px.png";
import CustomSelect from "@/components/CustomSelect";
import { useQuery } from "@tanstack/react-query";
import { limit, ROLE } from "@/lib/Constants";
import { useState } from "react";
import Pagination from "@/components/Pagination";
import { useNavigate } from "@tanstack/react-router";
import { addUserRoute } from "@/router";
import { useUserStore } from "@/store/user";
import UsersTable from "@/components/User/UsersTable";
import UserCard from "@/components/User/UserCard";
import UserCardLoading from "@/components/User/UserCardLoading";
import { getUsers } from "@/apis/user";

export default function UserList() {
  const role = useUserStore((state) => state.user.role);

  const initialQuery = {
    page: 0,
    limit,
    roles: [],
  };
  const [query, setQuery] = useState(initialQuery);

  const { isPending, data } = useQuery({
    queryKey: ["userlists", query],
    queryFn: () => getUsers(query),
  });

  const values = data?.data.data ?? [];
  //
  const total = data?.data?.count;

  const handleParamChange = (field: any, val: any) => {
    if (field == "roles") setQuery((v) => ({ ...v, roles: val }));
    if (field == "page") setQuery((v) => ({ ...v, page: val }));
  };

  const navigate = useNavigate();

  // const [view, setView] = useState("list");
  const view = "list";

  const roles = [
    {
      label: "Super Admin",
      value: ROLE.SUPER_ADMIN,
    },
    {
      label: "Admin",
      value: ROLE.ADMIN,
    },
  ];

  return (
    <Layout>
      <NavbarAlt />
      <div className="p-[1rem] sm:p-[2.5rem]">
        <div className="flex justify-between items-center">
          <div className=" text-primary font-bold text-[2.5rem]">User List</div>
          {role == "SUPER_ADMIN" && (
            <div className="w-50">
              <Button
                text="Add New User "
                className={"text-sm h-10 rounded-[0.25rem] text-nowrap "}
                onClick={() => navigate({ to: addUserRoute.to })}
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
              label="Roles"
              items={roles}
              onChange={(v: any) => handleParamChange("roles", v)}
              values={query.roles}
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
        {/* <div className="flex w-full justify-end text-black">
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
        </div> */}

        <>
          {view == "list" ? (
            <div className=" mt-8">
              <UsersTable data={values} loading={isPending} />
            </div>
          ) : (
            <>
              {isPending ? (
                <div className="flex flex-wrap mt-6 justify-between">
                  {[1, 2, 3, 4, 5, 6].map((v: any) => (
                    <UserCardLoading key={v._id} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap mt-6 ">
                  {values?.map((v: any) => <UserCard data={v} key={v._id} />)}
                </div>
              )}
            </>
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
      </div>
    </Layout>
  );
}
