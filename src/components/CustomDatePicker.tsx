import { useState } from "react";
import DatePicker from "react-multi-date-picker";
import Footer from "react-multi-date-picker/plugins/range_picker_footer";
import Button from "./Button";
import { ArrowLeft2, ArrowRight, ArrowRight2 } from "iconsax-react";

export function CustomDatePicker() {
  const today = new Date();
  const tomorrow = new Date();

  tomorrow.setDate(tomorrow.getDate() + 1);

  const [values, setValues] = useState([]);

  return (
    <DatePicker
      headerOrder={["MONTH_YEAR", "LEFT_BUTTON", "RIGHT_BUTTON"]}
      multiple
      value={values}
      render={(value, openCalendar) => (
        <span onClick={openCalendar} className="bg-white cursor-pointer">
          Select
        </span>
      )}
      onChange={setValues}
      plugins={[<Control position="bottom" />]}
      renderButton={(direction, handleClick) => (
        <button onClick={handleClick} className=" bg-slate-100 h-fit p-1 mx-2">
          {direction === "right" ? (
            <ArrowRight2 size={15} />
          ) : (
            <ArrowLeft2 size={15} />
          )}
        </button>
      )}
    />
  );
}

export function Control() {
  return (
    <div className="flex justify-between w-full h-[8.125rem] p-4 flex-col items-center">
      <div className=" text-[#434343] opacity-80 text-sm w-full  text-left">
        *You can choose multiple date
      </div>
      <div className="w-[9.375rem] pb-3">
        <Button text="Apply Now" className={"text-sm h-10 rounded-[0.25rem]"} />
      </div>
    </div>
  );
}
