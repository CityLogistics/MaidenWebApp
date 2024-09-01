import { Cell, Pie, PieChart } from "recharts";

export default function Deliveries() {
  const data = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
  ];
  const COLORS = ["#E1E4E8", "#F68716", "#448EFC"];

  return (
    <div className=" w-[100%] bg-white h-full  rounded-xl p-6 py-7">
      <div className="flex justify-between">
        <div className="text-[#202224] font-bold">Deliveries</div>
        <div className="text-[#F68716] font-normal text-[0.625rem]">July</div>
      </div>
      <div className="  h-full flex flex-col justify-center items-center ">
        <div className="relative">
          <PieChart width={250} height={150}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              // label={renderCustomizedLabel}
              outerRadius={70}
              innerRadius={50}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
          <div className="absolute z-50  top-0  h-full w-full flex justify-center items-center">
            <div className=" text-center">
              <div className="text-2xl font-bold text-black">300</div>
              <div className="text-sm font-bold text-black">
                Total Deliveries
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="flex items-center  ">
            <div className="rounded-full h-4 w-4 bg-[#E1E4E8] " />
            <div className="text-[#333333] text-[0.625rem] ml-2 leading-none mt-1">
              Delayed
            </div>
          </div>
          <div className="flex items-center ml-2   ">
            <div className="rounded-full h-4 w-4 bg-[#F68716] " />
            <div className="text-[#333333] text-[0.625rem] ml-2 leading-none mt-1">
              Pending
            </div>
          </div>
          <div className="flex items-center ml-2   ">
            <div className="rounded-full h-4 w-4 bg-[#448EFC] " />
            <div className="text-[#333333] text-[0.625rem] ml-2 leading-none mt-1">
              On Time
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
