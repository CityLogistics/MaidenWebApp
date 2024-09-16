import { useCloudinary } from "@/lib/utils";
import Loader from "./Loader";

export default function ImageComponent({ onChange, value }: any) {
  const { loading: widgetLoading, launchWidget } = useCloudinary(onChange);

  return (
    <div className=" flex flex-col items-center">
      <img src={value} alt="" className=" w-20 h-20 rounded-full bg-slate-50" />

      {widgetLoading ? (
        <Loader dotClassess="bg-[#F68716] w-2 h-2 " />
      ) : (
        <div
          className="text-[#F68716]  font-semibold text-sm mt-2 cursor-pointer"
          onClick={launchWidget}
        >
          Edit Photo
        </div>
      )}
      {/* </label> */}
    </div>
  );
}
