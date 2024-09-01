export function NewDriverCardLoading() {
  return (
    <div className=" w-[100%] bg-white my-3 rounded-xl overflow-clip flex flex-col lg:flex-row animate-pulse">
      <div className=" h-[12rem] w-[250px] mx-auto mt-6 lg:mt-0 lg:w-[20%] bg-slate-400  bg-cover rounded-xl "></div>
      <div className="p-4 flex  justify-between  flex-1 py-6 ml-6 text-[#202224] ">
        <div className="flex-1 justify-between font-bold">
          <div className=" w-2/3 " />
          <div className=" opacity-60 font-normal " />
          <div className="flex   opacity-60 text-sm ">
            <div className=" font-semibold mr-1 bg-slate-400  w-48 h-4 rounded-xl" />
          </div>
          <div className="flex opacity-60 text-sm mt-8">
            <div className=" font-semibold mr-1 bg-slate-400  w-60 h-4 rounded-xl" />
          </div>
          <div className="flex opacity-60 text-sm mt-2">
            <div className=" font-semibold mr-1 bg-slate-400  w-52 h-4 rounded-xl" />
          </div>
          <div className="flex opacity-60 text-sm mt-2">
            <div className=" font-semibold mr-1 bg-slate-400  w-64 h-4 rounded-xl" />
          </div>
        </div>

        <div className="flex-1 justify-between  text-[#202224] ">
          <div className=" font-semibold mr-1 bg-slate-400  w-52 h-4 rounded-xl" />
          <div className="flex opacity-60 text-sm mt-8">
            <div className=" font-semibold mr-1 bg-slate-400  w-60 h-4 rounded-xl" />
          </div>
          <div className="flex opacity-60 text-sm mt-2">
            <div className=" font-semibold mr-1 bg-slate-400  w-52 h-4 rounded-xl" />
          </div>
          <div className="flex opacity-60 text-sm mt-2">
            <div className=" font-semibold mr-1 bg-slate-400  w-64 h-4 rounded-xl" />
          </div>
        </div>
      </div>
      <div className="p-6 ">
        <div className="flex opacity-60 text-sm mt-2">
          <div className=" font-semibold mr-1 bg-slate-400  w-32 h-10 rounded-[8px]" />
        </div>
        <div className="flex opacity-60 text-sm mt-2">
          <div className=" font-semibold mr-1 bg-slate-400  w-32 h-10 rounded-[8px]" />
        </div>
      </div>
    </div>
  );
}
