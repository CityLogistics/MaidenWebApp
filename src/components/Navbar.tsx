import { Notification } from "iconsax-react";
import { Search } from "lucide-react";
import { useUserStore } from "@/store/user";

export default function Navbar() {
  const { firstName, lastName, image } = useUserStore((state) => state.user);

  return (
    <div className="flex ">
      <div className=" flex w-[24.3rem] h-[2.3rem] rounded-3xl bg-[#F1F4F9] border-0 py-1.5 pl-4 pr-20 text-white ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:text-lg focus:ring-2 focus:ring-inset text-base sm:text-sm sm:leading-6">
        <Search className=" text-gray-400" />
        <input
          type="text"
          name="price"
          id="price"
          className="block bg-transparent w-full pl-4"
          placeholder="Search"
        />
      </div>

      <div className="ml-auto flex items-center">
        <div className=" relative">
          <Notification variant="Bold" size="32" />
          <div className=" h-4 w-4 rounded-full  bg-[#F68716] flex justify-center items-center text-center  absolute top-0 right-0">
            <span className="text-[0.6rem] font-semibold">3</span>
          </div>
        </div>
        <div className="h-9 w-9 rounded-full bg-slate-50 ml-10 overflow-clip">
          <img src={image} alt="" />
        </div>
        <div className="text-white ml-4 flex flex-col">
          <span className="text-base ">{`${firstName} ${lastName}`}</span>
          <span className="text-sm font-light">Admin</span>
        </div>
      </div>
    </div>
  );
}
