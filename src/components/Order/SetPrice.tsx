import Button from "../Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  //   DialogTrigger,
} from "../ui/dialog";
import { useMutation } from "@tanstack/react-query";
import { twMerge } from "tailwind-merge";
import Loader from "../Loader";
import { toast } from "sonner";
import { parseError, queryClient } from "@/lib/utils";
import { AxiosError } from "axios";
import TextField from "../TextField";
import { useFormik } from "formik";
import * as yup from "yup";
import { setOrderPrice } from "@/apis/orders";

export default function SetPrice({
  orderId,
  open,
  setOpen,
  setModalOpen,
}: any) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: setOrderPrice,
    onSuccess: (_) => {
      toast.success("Quote sent successfully");
      queryClient.invalidateQueries({ queryKey: ["manualOrders"] });
      setTimeout(() => {
        setModalOpen?.(null);
      }, 1000);
    },
    onError: (e: AxiosError) => {
      toast.error(parseError(e));
    },
  });

  const validationSchema = yup.object().shape({
    totalAmount: yup
      .number()
      .typeError("invalid amount")
      .required("this field is required"),
  });

  const initialValues = {
    totalAmount: "",
  };

  const { handleSubmit, handleChange, values, errors, touched } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (data) => {
      mutateAsync({
        id: orderId,
        data: { totalPrice: parseFloat(data.totalAmount) * 100 },
      });
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <Dialog open={open} onOpenChange={setOpen}>
        {/* <DialogTrigger className=" bg-white">{label}</DialogTrigger> */}
        <DialogContent className=" bg-white rounded-2xl w-[90%] sm:w-[32.6rem] min-h-48 p-10 ">
          <div className=" text-[#202224] font-bold">Send Request Quote</div>
          <div className="-mt-1">
            <TextField
              label="Price"
              id="totalAmount"
              name="totalAmount"
              onChange={handleChange}
              value={values.totalAmount}
              error={touched.totalAmount && Boolean(errors.totalAmount)}
              helperText={touched.totalAmount && errors.totalAmount}
            />
            {isPending && (
              <div className="flex justify-end">
                <Loader dotClassess="w-3 h-3" />
              </div>
            )}
            <div
              className={twMerge(
                "w-[9rem] mx-auto  mt-12",
                isPending && " w-40"
              )}
            >
              <Button
                loading={isPending}
                type="submit"
                text="Send Quote"
                className="text-sm rounded-[0.2rem]"
                onClick={handleSubmit}
              />
            </div>
            <div className="w-[9rem] mx-auto mt-1">
              <DialogClose asChild>
                <button
                  type="button"
                  className="text-sm text-[#F68716] bg-white hover:border-[#F68716] rounded-[0.2rem] w-full h-12"
                >
                  Go Back
                </button>
              </DialogClose>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </form>
  );
}
