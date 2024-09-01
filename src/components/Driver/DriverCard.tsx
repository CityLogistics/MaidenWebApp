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
  } = data;

  return (
    <div className=" w-[100%] lg:w-[49%]  2xl:w-[32%] lg:mr-[1%]  bg-white my-3 rounded-xl overflow-clip">
      <div
        className=" h-[20rem] bg-slate-50  bg-cover "
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <div className="p-4 flex flex-col justify-between  ">
        <div className="flex justify-between font-bold">
          <div className=" text-[#202224]">{`${firstName} ${lastName}`}</div>
          <div className=" text-[#2F80ED] capitalize">
            {vehicleType?.toLowerCase()}
          </div>
        </div>

        <div className="flex justify-between  text-[#202224] opacity-60  text-sm mt-2 ">
          <div className=" ">{email}</div>
          <div className=" ">{phoneNumber}</div>
        </div>
        <div className="flex  text-[#202224] opacity-60 text-sm mt-2">
          <div className=" font-semibold mr-1 ">Days: </div>
          <div className=" capitalize ">
            {availabiltyDays.map((v: any) => v.toLowerCase()).join(" / ")}
          </div>
        </div>
        <div className="flex  text-[#202224] opacity-60 text-sm mt-2">
          <div className=" font-semibold mr-1 ">Availability: </div>
          <div className=" ">
            {availabiltyTime.map((v: any) => v.toLowerCase()).join(" / ")}
          </div>
        </div>
      </div>
    </div>
  );
}
