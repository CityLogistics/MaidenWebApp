import DashBoardSummary from "@/components/Dashboard/DashBoardSummary";
import Satisfactionchart from "../components/Satisfactionchart";
import NewOrders from "@/components/Dashboard/NewOrders";
import NewDrivers from "@/components/Dashboard/NewDrivers";
import Deliveries from "@/components/Dashboard/Deliveries";
import RecentOrdersTable from "@/components/Dashboard/RecentOrdersTable";
import Layout from "@/components/Layout";

export default function DashBoard() {
  return (
    <Layout>
      <DashBoardSummary />
      <div className="bg-[#F5F6FA] p-[1rem] sm:p-[2.5rem] w-full rounded-2xl flex  items-center ">
        <div className="flex flex-col lg:flex-row w-full  lg:h-[36.25rem] overflow-x-clip">
          <div className=" flex w-full flex-col h-full ">
            <div className="w-full  mr-4 h-1/2 mb-2 ">
              <Satisfactionchart />
            </div>
            <div className="flex flex-col md:flex-row h-1/2 pt-4">
              <div className="flex-1 md:mr-2 ">
                <NewDrivers />
              </div>
              <div className="flex-1 md:ml-2 mt-4 md:m-0">
                <Deliveries />
              </div>
            </div>
          </div>
          <div className=" w-full lg:w-[50%] h-[30vh]  lg:h-full lg:ml-4 mt-5 lg:mt-0 ">
            <NewOrders />
          </div>
        </div>
      </div>
      <div className=" w-full  px-[2.5rem]  pb-[2.5rem]">
        <RecentOrdersTable />
      </div>
    </Layout>
  );
}
