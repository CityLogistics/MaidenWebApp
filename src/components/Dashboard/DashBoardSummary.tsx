import { BagTimer, Profile2User, ShoppingCart, SmartCar } from "iconsax-react";
import LoginImg from "../../assets/images/dashboard.png";
import Suv from "../../assets/images/suv_1.png";

import Navbar from "../Navbar";

export default function DashBoardSummary() {
  return (
    <div
      className=" flex-1 px-[2.5rem] py-[1.5rem] pb-0 relative bg-cover"
      style={{ backgroundImage: `url(${LoginImg})` }}
    >
      <Navbar />

      <div className="flex mt-[4.3rem] text-[#FFFFFF">
        <div className="w-[55%]">
          <div className=" font-bold text-[2.5rem] ]">
            Good Morning, Olaseni
          </div>

          <div className="text-xl">Here’s your overview as at today</div>
        </div>

        <div className="pl-[2.5rem] py-[0.9rem] w-[45%]">
          <div className="flex w-full justify-between">
            <div className=" bg-[#FFFFFF] w-[47.5%]  rounded-l-[3rem] rounded-tr-[3rem] rounded-br-[1rem] p-[0.5rem] pr-6 flex items-center">
              <div className="rounded-full  bg-primary h-[4.3rem] w-[4.3rem] flex justify-center items-center ">
                <ShoppingCart size="30" variant="Bold" />
              </div>
              <div className="text-black ml-4 flex-1 ">
                <div className="text-base font-semibold ml-1  ">
                  Total Orders
                </div>
                <div className="text-2xl font-semibold ml-1  ">500</div>
              </div>
            </div>
            <div className=" bg-[#FFFFFF] w-[47.5%]  rounded-r-[3rem] rounded-tl-[3rem] rounded-bl-[1rem] p-[0.5rem] pr-6 flex items-center">
              <div className="rounded-full  bg-primary h-[4.3rem] w-[4.3rem] flex justify-center items-center ">
                <Profile2User size="30" variant="Bold" />
              </div>
              <div className="text-black ml-4 flex-1">
                <div className="text-base font-semibold ml-1  ">
                  Total Drivers
                </div>
                <div className="text-2xl font-semibold ml-1  ">500</div>
              </div>
            </div>
          </div>
          <div className="flex w-full justify-between ">
            <div className=" bg-[#FFFFFF] w-[47.5%] rounded-l-[3rem] rounded-br-[3rem] rounded-tr-[1rem] p-[0.5rem] pr-6 flex items-center mt-4">
              <div className="rounded-full  bg-primary h-[4.3rem] w-[4.3rem] flex justify-center items-center ">
                <SmartCar size="30" variant="Bold" />
              </div>
              <div className="text-black ml-4 flex-1">
                <div className="text-base font-semibold ml-1 ">
                  Orders in Transit
                </div>
                <div className="text-2xl font-semibold ml-1  ">500</div>
              </div>
            </div>
            <div className=" bg-[#FFFFFF] w-[47.5%]  rounded-r-[3rem] rounded-bl-[3rem] rounded-tl-[1rem] p-[0.5rem] pr-6 flex items-center mt-4">
              <div className="rounded-full  bg-primary h-[4.3rem] w-[4.3rem] flex justify-center items-center ">
                <BagTimer size="30" variant="Bold" />
              </div>
              <div className="text-black ml-4 flex-1 ">
                <div className="text-base font-semibold ml-1  ">
                  Pending Orders
                </div>
                <div className="text-2xl font-semibold ml-1  ">500</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=" -bottom-[0.1rem] left-0 w-full flex absolute ">
        <div className="bg-[#F5F6FA] w-[55%]  h-[3.1rem] rounded-tl-[2.2rem] relative flex py-2 justify-start">
          <div className=" bg-[#F68716] h-14 ml-[2.6rem] mr-[1rem] rounded-[2rem] px-[0.5rem] pr-6 flex items-center">
            <div className="rounded-full  bg-[#F5F6FA] h-12 w-12 relative">
              <img
                src={Suv}
                alt="Suv"
                width={30}
                className="w-[8rem] h-[2.5rem] object-fill absolute left-1 "
              />
            </div>
            <div className="text-base font-bold ml-1 text-[#FFFFFF] whitespace-nowrap">
              Below 50kg
            </div>
          </div>
          <div className=" bg-[#EFEFEF] min-w-40 h-14 mx-[1rem] rounded-[2rem] px-[0.5rem] flex items-center">
            <div className="rounded-full  bg-[#F5F6FA] h-12 w-12 relative">
              <img
                src={Suv}
                alt="Suv"
                width={30}
                className="w-[8rem] h-[2.5rem] object-fill absolute left-1 "
              />
            </div>
            <div className="text-base font-bold ml-1 text-[#F68716]">Large</div>
          </div>
          <div className=" bg-[#EFEFEF] min-w-40  h-14 mx-[1rem] rounded-[2rem] px-[0.5rem] flex items-center">
            <div className="rounded-full  bg-[#F5F6FA] h-12 w-12 relative">
              <img
                src={Suv}
                alt="Suv"
                width={30}
                className="w-[8rem] h-[2.5rem] object-fill absolute left-1 "
              />
            </div>
            <div className="text-base font-bold ml-1 text-[#F68716]">
              Extra Large
            </div>
          </div>
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-[3.1rem]  -right-1 z-20 absolute left-[54.5%]"
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
