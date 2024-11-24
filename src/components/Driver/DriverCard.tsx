import { carTypes } from "@/lib/Constants";
import DeleteDriver from "./DeleteDriver";
import { twMerge } from "tailwind-merge";

export default function DriverCard({ data }: any) {
  const {
    firstName,
    lastName,
    vehicleType,
    email,
    phoneNumber,
    availabiltyDays,
    availabiltyTime,
    image,
    status,
    _id,
  } = data;

  const getStatusLabel = (data: any) => {
    const status = data.toLowerCase();
    const classNames =
      "w-[100px] h-[27px] rounded-[5px] flex justify-center items-center text-white text-sm font-bold bg-opacity-20 capitalize";

    switch (data) {
      case "ACCEPTED":
        return (
          <div className={twMerge(classNames, "bg-[#00b69b]  text-[#00b69b]")}>
            {status}
          </div>
        );

      case "DECLINED":
        return (
          <div className={twMerge(classNames, "bg-[#fd5454] text-[#fd5454]")}>
            {status}
          </div>
        );

      default:
        return (
          <div className={twMerge(classNames, "bg-[#fcbe2d] text-[#fcbe2d] ")}>
            {status}
          </div>
        );
    }
  };

  return (
    <div className=" w-[100%] lg:w-[49%]  2xl:w-[32%] lg:mr-[1%]  bg-white my-3 rounded-xl overflow-clip">
      <div
        className=" h-[20rem] bg-slate-50  bg-cover "
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <div className="p-4 flex flex-col justify-between  ">
        <div className="flex justify-between font-bold">
          <div className=" text-[#202224] capitalize flex">
            {`${firstName} ${lastName}`}
            <span className="ml-1"> {getStatusLabel(status)}</span>
          </div>
          <div className=" text-[#2F80ED] capitalize">
            {carTypes.find((v: any) => v.value == vehicleType)?.label}
          </div>
        </div>

        <div className="flex justify-between  text-[#202224] opacity-60  text-sm mt-2 ">
          <div className=" ">{email}</div>
          <div className=" ">{phoneNumber}</div>
        </div>
        <div className="flex  text-[#202224] opacity-60 text-sm mt-2">
          <div className=" font-semibold mr-1 ">Days: </div>
          <div className=" capitalize ">
            {availabiltyDays.map((v: any) => v.toLowerCase()).join(", ")}
          </div>
        </div>
        <div className="flex  text-[#202224] opacity-60 text-sm mt-2">
          <div className=" font-semibold mr-1 ">Availability: </div>
          <div className=" ">
            {availabiltyTime.map((v: any) => v.toLowerCase()).join(", ")}
          </div>
        </div>
      </div>
      <div className="flex p-4  justify-end">
        <DeleteDriver id={_id} />
      </div>
    </div>
  );
}
