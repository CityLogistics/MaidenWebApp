import Button from "./Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  //   DialogTrigger,
} from "./ui/dialog";

export default function ConfirmDialouge({
  setOpen,
  onProceed,
  message,
  onCancel,
}: any) {
  return (
    <Dialog open onOpenChange={setOpen}>
      {/* <DialogTrigger className=" bg-white">{label}</DialogTrigger> */}
      <DialogContent className=" bg-white rounded-2xl w-[32.6rem] min-h-48 p-10 ">
        <div className="text-[#202224] text-[2rem] font-bold font-['Nunito Sans'] text-center">
          Are you sure?
        </div>

        {message && (
          <div className=" mb-2 text-[#202224] text-center">{message}</div>
        )}
        <div className="flex justify-center">
          <div className="w-[9rem]  ">
            <DialogClose asChild>
              <button
                type="button"
                className="text-sm text-[#F68716] bg-white hover:border-[#F68716] rounded-[0.2rem] w-full h-12"
                onClick={onCancel}
              >
                Go Back
              </button>
            </DialogClose>
          </div>
          <div className="w-2" />
          <div className="w-[9rem] ">
            <Button
              onClick={onProceed}
              text="Continue"
              className="text-sm rounded-[0.2rem]"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
