import { BagTimer, Profile2User, ShoppingCart, SmartCar } from "iconsax-react";
import LoginImg from "../../assets/images/dashboard.png";
import Suv from "../../assets/images/suv_1.png";
import large from "../../assets/images/large.png";
import xlarge from "../../assets/images/xlarge.png";

import Navbar from "../Navbar";
import { useUserStore } from "@/store/user";
import { getStats } from "@/apis/admin";
import { useQuery } from "@tanstack/react-query";
import { twMerge } from "tailwind-merge";

export default function DashBoardSummary() {
  const firstName = useUserStore((state) => state.user.firstName);
  const today = new Date();

  const curHr = today.getHours();

  const getTime = () => {
    if (curHr < 12) {
      return "morning";
    } else if (curHr < 18) {
      return "afternoon";
    } else {
      return "evening";
    }
  };

  const { isPending, data } = useQuery({
    queryKey: ["stats"],
    queryFn: getStats,
  });

  const values = data?.data || {};

  const { pendingOrders, totalDrivers, totalOrders, totalOrdersInTransit } =
    values;

  return (
    <div
      className=" flex-1 px-[2.5rem] py-[1.5rem] pb-0 relative bg-cover"
      style={{ backgroundImage: `url(${LoginImg})` }}
    >
      <Navbar />

      <div className="flex flex-col md:flex-row mt-[1.3rem] text-[#FFFFFF">
        <div className=" w-full md:w-[55%]">
          <div className=" font-bold text-[1.5rem] sm:text-[2.5rem] capitalize">
            Good {getTime()}, {firstName}
          </div>

          <div className="text-xl">Here’s your overview as at today</div>
        </div>

        <div className="md:pl-[2.5rem] py-[0.9rem] w-full md:w-[45%] mb-12 md:mb-0">
          <div className="flex  w-full justify-between">
            <div
              className={twMerge(
                " bg-[#FFFFFF] w-[47.5%]  rounded-l-[3rem] rounded-tr-[3rem] rounded-br-[1rem] p-[0.5rem] pr-6 flex flex-col sm:flex-row items-center   overflow-clip",
                isPending && "animate-pulse"
              )}
            >
              {isPending ? (
                <>
                  <div className="w-full h-16 "></div>
                </>
              ) : (
                <>
                  <div className="rounded-full  bg-primary h-[4.3rem] w-[4.3rem] flex justify-center items-center ">
                    <ShoppingCart size="30" variant="Bold" />
                  </div>
                  <div className="text-black ml-4 flex-1 ">
                    <div className="text-sm sm:text-base text-nowrap font-semibold ml-1  ">
                      Total Orders
                    </div>
                    <div className="text-2xl font-semibold ml-1  ">
                      {totalOrders || 0}
                    </div>
                  </div>
                </>
              )}
            </div>
            <div
              className={twMerge(
                " bg-[#FFFFFF] w-[47.5%]  rounded-r-[3rem] rounded-tl-[3rem] rounded-bl-[1rem] p-[0.5rem] pr-6 flex flex-col sm:flex-row items-center  overflow-clip",
                isPending && "animate-pulse"
              )}
            >
              {isPending ? (
                <>
                  <div className="w-full h-16 "></div>
                </>
              ) : (
                <>
                  <div className="rounded-full  bg-primary h-[4.3rem] w-[4.3rem] flex justify-center items-center ">
                    <Profile2User size="30" variant="Bold" />
                  </div>
                  <div className="text-black ml-4 flex-1">
                    <div className="text-sm sm:text-base text-nowrap font-semibold ml-1  ">
                      Total Drivers
                    </div>
                    <div className="text-2xl font-semibold ml-1  ">
                      {totalDrivers || 0}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="flex w-full justify-between ">
            <div
              className={twMerge(
                "bg-[#FFFFFF] w-[47.5%] rounded-l-[3rem] rounded-br-[3rem] rounded-tr-[1rem] p-[0.5rem] pr-6 flex flex-col sm:flex-row items-center  overflow-clip mt-4",
                isPending && "animate-pulse"
              )}
            >
              {isPending ? (
                <>
                  <div className="w-full h-16 "></div>
                </>
              ) : (
                <>
                  <div className="rounded-full  bg-primary h-[4.3rem] w-[4.3rem] flex justify-center items-center ">
                    <SmartCar size="30" variant="Bold" />
                  </div>
                  <div className="text-black ml-4 flex-1">
                    <div className="text-sm sm:text-base text-nowrap font-semibold ml-1 ">
                      Active Orders
                    </div>
                    <div className="text-2xl font-semibold ml-1  ">
                      {totalOrdersInTransit || 0}
                    </div>
                  </div>
                </>
              )}
            </div>
            <div
              className={twMerge(
                "bg-[#FFFFFF] w-[47.5%]  rounded-r-[3rem] rounded-bl-[3rem] rounded-tl-[1rem] p-[0.5rem] pr-6 flex flex-col sm:flex-row items-center mt-4 overflow-clip",
                isPending && "animate-pulse"
              )}
            >
              {isPending ? (
                <>
                  <div className="w-full h-16 "></div>
                </>
              ) : (
                <>
                  <div className="rounded-full  bg-primary h-[4.3rem] w-[4.3rem] flex justify-center items-center ">
                    <BagTimer size="30" variant="Bold" />
                  </div>
                  <div className="text-black ml-4 flex-1 ">
                    <div className=" text-sm sm:text-base text-nowrap font-semibold ml-1  ">
                      Pending Orders
                    </div>
                    <div className="text-2xl font-semibold ml-1  ">
                      {pendingOrders || 0}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className=" -bottom-[0.1rem] left-0 w-full flex absolute ">
        <div className="bg-[#F5F6FA] w-[100%] md:w-[55%]   h-[3.1rem] rounded-tl-[2.2rem] md:rounded-tr-[0rem] rounded-tr-[2.2rem] relative flex py-2 justify-start ">
          <div className=" bg-[#F68716] h-14 ml-[1rem] md:ml-[2.6rem] mr-[1rem] rounded-[2rem] px-[0.5rem] xl:pr-6 flex items-center">
            <div className="rounded-full  bg-[#F5F6FA] h-12 w-12 relative ">
              <img
                src={Suv}
                alt="Suv"
                width={30}
                className="w-[16rem] h-[2.2rem] object-cover absolute left-1"
              />
            </div>
            <div className="text-base font-bold ml-1 text-[#FFFFFF] whitespace-nowrap  hidden xl:flex">
              Below 50kg
            </div>
          </div>
          <div className=" bg-[#EFEFEF] xl:min-w-40 h-14 mx-[1rem] rounded-[2rem] px-[0.5rem] xl:pr-6 flex items-center">
            <div className="rounded-full  bg-[#F5F6FA] h-12 w-12 relative">
              <img
                src={large}
                alt="Suv"
                width={30}
                className="w-[18rem] h-[1.8rem] object-cover absolute left-0.5 top-2.5"
              />
            </div>
            <div className="text-base font-bold ml-1 text-[#F68716] hidden xl:flex">
              Large
            </div>
          </div>
          <div className=" z-50 bg-[#EFEFEF] xl:min-w-40  h-14 mx-[1rem] rounded-[2rem] px-[0.5rem] xl:pr-6 flex items-center">
            <div className="rounded-full  bg-[#F5F6FA] h-12 w-12 relative">
              <img
                src={xlarge}
                alt="Suv"
                width={30}
                className="w-[18rem] h-[1.8rem] object-cover absolute left-0.5 top-2"
              />
            </div>
            <div className="text-base font-bold ml-1 text-[#F68716] hidden xl:flex">
              Extra Large
            </div>
          </div>
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-[3.1rem]  -right-1 z-20 absolute left-[54.5%] hidden md:flex"
          viewBox="-0.642 -0.453 1.277 0.905"
        >
          <path
            d="M -0.574 0.452 H 0.635 Q 0.182 0.409 0.005 0 Q -0.189 -0.425 -0.642 -0.453"
            fill="#F5F6FA"
          />
        </svg>
        {/* 
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 1.996 1.999">
	<path d="M -1 0.999 H 0.996 Q 0 0.999 0.005 0 Q -0.001 -0.999 -1 -1" fill="#F5F6FA"/>
</svg> */}
      </div>
    </div>
  );
}
