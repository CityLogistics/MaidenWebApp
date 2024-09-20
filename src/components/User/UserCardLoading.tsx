export default function UserCardLoading() {
  return (
    <div className=" w-[100%] lg:w-[49%] 2xl:w-[32%]   bg-white my-3 rounded-xl overflow-clip animate-pulse ">
      <div className=" h-[20rem] bg-slate-700  bg-cover "></div>
      <div className="p-4 flex flex-col justify-between  ">
        <div className="flex justify-between font-bold">
          <div className=" bg-slate-700 w-20 h-4 rounded-xl" />
          <div className=" bg-slate-700 w-24 h-4 rounded-xl" />
        </div>

        <div className="flex justify-between font-bold mt-2">
          <div className=" bg-slate-700 w-36 h-3 rounded-xl" />
          <div className=" bg-slate-700 w-32 h-3 rounded-xl" />
        </div>
        <div className=" bg-slate-700 w-32 h-3 rounded-xl mt-2" />
        <div className=" bg-slate-700 w-52 h-3 rounded-xl mt-2" />
      </div>
    </div>
  );
}
