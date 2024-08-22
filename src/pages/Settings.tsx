import { updateUser } from "@/apis/user";
import Button from "@/components/Button";
import Layout from "@/components/Layout";
import NavbarAlt from "@/components/NavbarAlt";
import SelectField from "@/components/SelectField";
import TextField from "@/components/TextField";
import { GENDER } from "@/lib/Constants";
import { parseError } from "@/lib/utils";
import { useUserStore } from "@/store/user";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import { toast } from "sonner";
import * as yup from "yup";

export default function Settings() {
  const { user: initialValues, updateUser: updateUserData } = useUserStore(
    (state) => state
  );

  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateUser,
    onSuccess: (data) => {
      updateUserData(data.data);
      toast.success("Changes saved successfully");
    },
    onError: (e: AxiosError) => {
      toast.error(parseError(e));
    },
  });

  const validationSchema = yup.object().shape({
    firstName: yup.string().required("this field is required"),
    lastName: yup.string().required("this field is required"),
    email: yup.string().email().required("this field is required"),
    phoneNumber: yup.string().required("this field is required"),
    dateOfBirth: yup.string().required("this field is required"),
    gender: yup.string().required("this field is required"),
  });

  const { handleSubmit, handleChange, values, errors, touched } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (data) => {
      const { email, ...others } = data;
      mutateAsync(others);
    },
  });

  const options = [
    {
      label: "male",
      value: GENDER.MALE,
    },
    {
      label: "female",
      value: GENDER.FEMALE,
    },
  ];

  return (
    <Layout>
      <NavbarAlt />
      <div className="p-[2.5rem]">
        <div className="flex justify-between items-center">
          <div className=" text-primary font-bold text-[2.5rem]">Settings</div>
        </div>

        <div className="bg-white rounded-2xl min-h-[20vh] mt-12 py-16">
          <div className=" flex flex-col justify-center w-full items-center">
            <img
              src={initialValues.image}
              alt=""
              className=" w-20 h-20 rounded-full bg-slate-50"
            />
            <input
              id="profile"
              type="file"
              onChange={() => null}
              className=" h-0 w-0"
            />
            <label htmlFor="profile">
              <div className="text-[#F68716]  font-semibold text-sm mt-2 cursor-pointer">
                Edit Photo
              </div>
            </label>
          </div>
          <div className="w-8/12 sm:w-10/12 lg:w-8/12 mx-auto grid  md:grid-cols-2 gap-14 mt-6">
            <div className="-mt-9">
              <TextField
                label="First Name"
                id="firstName"
                name="firstName"
                onChange={handleChange}
                value={values.firstName}
                error={touched.firstName && Boolean(errors.firstName)}
                helperText={touched.firstName && errors.firstName}
              />
            </div>
            <div className="-mt-9">
              <TextField
                label="Last Name"
                id="lastName"
                name="lastName"
                onChange={handleChange}
                value={values.lastName}
                error={touched.lastName && Boolean(errors.lastName)}
                helperText={touched.lastName && errors.lastName}
              />
            </div>
            <div className="-mt-9">
              <TextField
                label="Email address"
                id="email"
                name="email"
                onChange={handleChange}
                value={values.email}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                disabled
              />
            </div>
            <div className="-mt-9">
              <TextField
                label="Phone Number"
                id="phoneNumber"
                name="phoneNumber"
                onChange={handleChange}
                value={values.phoneNumber}
                error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                helperText={touched.phoneNumber && errors.phoneNumber}
              />
            </div>
            <div className="-mt-9">
              <TextField
                label="Date Of Birth"
                id="dateOfBirth"
                name="dateOfBirth"
                onChange={handleChange}
                value={values.dateOfBirth}
                error={touched.dateOfBirth && Boolean(errors.dateOfBirth)}
                helperText={touched.dateOfBirth && errors.dateOfBirth}
              />
            </div>
            <div className="-mt-9">
              <SelectField
                label="Gender"
                id="gender"
                name="gender"
                onChange={handleChange}
                value={values.gender}
                error={touched.gender && Boolean(errors.gender)}
                helperText={touched.gender && errors.gender}
                options={options}
              />
            </div>
          </div>
          <div className="w-8/12 sm:w-[25rem]  mt-[4.875rem] mx-auto">
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