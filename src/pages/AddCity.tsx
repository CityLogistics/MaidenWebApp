import { addCity } from "@/apis/cities";
import Button from "@/components/Button";
import Layout from "@/components/Layout";
import NavbarAlt from "@/components/NavbarAlt";
import SelectField from "@/components/SelectField";
import TextField from "@/components/TextField";
import { regions } from "@/lib/Constants";
import { parseError } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import { toast } from "sonner";
import * as yup from "yup";

export default function AddCity() {
  const validationSchema = yup.object().shape({
    province: yup.string().required("this field is required"),
    name: yup.string().required("this field is required"),
  });

  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    touched,
    resetForm,
    setFieldValue,
  } = useFormik({
    initialValues: {
      province: "",
      name: "",
    },
    validationSchema,
    onSubmit: (data) => {
      mutateAsync(data);
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: addCity,
    onSuccess: (_) => {
      resetForm();
      toast.success("City saved");
    },
    onError: (e: AxiosError) => {
      toast.error(parseError(e));
    },
  });

  const handleProvinceChange = (province: string) => {
    setFieldValue("name", ""), setFieldValue("province", province);
  };

  return (
    <Layout>
      <NavbarAlt />
      <div className=" p-[1rem] sm:p-[2.5rem]">
        <div className="flex justify-between items-center">
          <div className=" text-primary font-bold text-[2.5rem]">Add City</div>
        </div>

        <div className="bg-white rounded-2xl min-h-[20vh] mt-12 py-16">
          <div className="w-8/12 sm:w-[25rem]  mt-[4.875rem] mx-auto">
            <div className=" mb-12">
              <div className="-mt-9">
                <SelectField
                  label="Province"
                  id="province"
                  name="province"
                  onChange={(e: any) => handleProvinceChange(e.target.value)}
                  value={values.province}
                  error={touched.province && Boolean(errors.province)}
                  helperText={touched.province && errors.province}
                  options={regions}
                />
              </div>
              <div className="">
                <TextField
                  label="City Name"
                  id="name"
                  name="name"
                  onChange={handleChange}
                  value={values.name}
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                />
              </div>
            </div>
            <Button
              loading={isPending}
              text="Save Changes"
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
