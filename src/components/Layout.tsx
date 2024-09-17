import { useManageRole, useManageSession } from "@/hooks/session";
import SiderBar from "./SiderBar";
import { Toaster } from "sonner";
import { useUserStore } from "@/store/user";

export default function Layout({ children }: any) {
  useManageSession();
  useManageRole();

  return (
    <div className=" bg-[#F5F6FA] h-screen w-screen bg-cover flex flex-col items-center overflow-x-clip font-['Nunito Sans'] overflow-y-visible">
      <div className="flex w-full overflow-x-clip">
        <SiderBar />
        <Toaster richColors position="top-center" />
        <div className="flex-1 overflow-y-auto h-svh ">{children}</div>
      </div>
    </div>
  );
}
