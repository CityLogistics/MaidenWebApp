import Button from "../Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  //   DialogTrigger,
} from "../ui/dialog";
import { parseError, queryClient } from "@/lib/utils";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useIsMutating, useMutation, useQuery } from "@tanstack/react-query";
import { X } from "lucide-react";
import * as yup from "yup";
import { useFormik } from "formik";
import { getCitiesByProvince } from "@/apis/cities";
import { updateUserCities } from "@/apis/user";
import MultiSelectField from "../MultiSelectField";

export default function EditUserCities({ setOpen, onCancel, user = {} }: any) {
  const { province, cities, _id } = user;

  const isFetching = useIsMutating();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateUserCities,
    onSuccess: (_) => {
      queryClient.invalidateQueries({ queryKey: ["userlists"] });
      toast.success("Cities saved successfully");
      onCancel();
    },
    onError: (e: AxiosError) => {
      toast.error(parseError(e));
    },
  });

  const validationSchema = yup.object().shape({
    cities: yup
      .array()
      .of(yup.string().required("this field is required"))
      .min(1, "this field is required")
      .required("this field is required"),
  });

  const { handleSubmit, values, errors, touched, resetForm, setFieldValue } =
    useFormik({
      initialValues: {
        cities,
      },
      validationSchema,
      onSubmit: (data) => {
        mutateAsync({ data, id: _id });
      },
    });

  const { isPending: citiesPending, data: citiesData } = useQuery({
    queryKey: ["cities", province],
    queryFn: () =>
      getCitiesByProvince({
        province,
        page: 0,
        limit: 50,
      }),
  });

  const availableCities = citiesData?.data.data ?? [];

  const options = availableCities.map((v: any) => ({
    name: v.name,
    id: v._id,
  }));

  return (
    <Dialog open onOpenChange={setOpen}>
      {/* <DialogTrigger className=" bg-white">{label}</DialogTrigger> */}
      <DialogContent className=" bg-white rounded-2xl w-[100%] sm:w-[32.6rem] min-h-[60vh] py-10 px-0 ">
        <div className="flex flex-col">
          <div className="text-[#202224] text-[2rem] font-bold font-['Nunito Sans'] text-center h-fit ">
            Edit Cities
          </div>
          <div className="absolute top-5 right-10">
            <DialogClose asChild>
              <X
                color="black"
                className=" cursor-pointer hover:bg-slate-100 rounded-full"
                onClick={isFetching ? () => null : () => onCancel()}
              />
            </DialogClose>
          </div>
          <div className="flex flex-col px-10 h-full ">
            <div className="w-full ">
              <MultiSelectField
                label="Cities"
                options={options}
                onChange={(v: string) => setFieldValue("cities", v)}
                values={values.cities}
                error={touched.cities && Boolean(errors.cities)}
                helperText={touched.cities && errors.cities}
                loading={citiesPending}
              />
            </div>
            <div className="w-full mt-[4.875rem] ">
              <Button
                loading={isPending}
                text="Save Changes"
                onClick={handleSubmit}
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
