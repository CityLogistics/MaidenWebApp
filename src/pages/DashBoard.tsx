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
      <div className="bg-[#F5F6FA] p-[2.5rem] w-full rounded-2xl flex  items-center ">
        <div className="flex w-full h-[36.25rem] overflow-x-clip">
          <div className=" flex w-full flex-col h-full ">
            <div className="w-full  mr-4 h-1/2 mb-2 ">
              <Satisfactionchart />
            </div>
            <div className="flex h-1/2 pt-4">
              <div className="flex-1 mr-2 ">
                <NewDrivers />
              </div>
              <div className="flex-1 ml-2  ">
                <Deliveries />
              </div>
            </div>
          </div>
          <div className=" w-[50%]  h-full ml-4 ">
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
