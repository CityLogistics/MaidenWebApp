import { addUser } from "@/apis/user";
import Button from "@/components/Button";
import DateField from "@/components/DateField";
import ImageComponent from "@/components/ImageComponent";
import Layout from "@/components/Layout";
import NavbarAlt from "@/components/NavbarAlt";
import SelectField from "@/components/SelectField";
import TextField from "@/components/TextField";
import { GENDER, ROLE } from "@/lib/Constants";
import { formatPhoneNumber, parseError } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import { toast } from "sonner";
import * as yup from "yup";

export default function AddUser() {
  const validationSchema = yup.object().shape({
    firstName: yup.string().required("this field is required"),
    lastName: yup.string().required("this field is required"),
    email: yup.string().email().required("this field is required"),
    phoneNumber: yup.string().required("this field is required"),
    dateOfBirth: yup.string().required("this field is required"),
    gender: yup.string().required("this field is required"),
    province: yup.string().required("this field is required"),
    city: yup.string().required("this field is required"),
    role: yup.string().required("this field is required"),
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
      image: "dd",
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      dateOfBirth: "",
      gender: "",
      password: "",
      province: "",
      city: "",
      role: "",
    },
    validationSchema,
    onSubmit: (data) => {
      const { phoneNumber, ...others } = data;
      mutateAsync({
        ...others,

        phoneNumber: formatPhoneNumber(phoneNumber),
      });
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: addUser,
    onSuccess: (_) => {
      resetForm();
      toast.success("User saved successfully");
    },
    onError: (e: AxiosError) => {
      toast.error(parseError(e));
    },
  });

  const options = [
    {
      label: "Male",
      value: GENDER.MALE,
    },
    {
      label: "Female",
      value: GENDER.FEMALE,
    },
  ];

  const regions = [
    {
      label: "Alberta",
      value: "ALBERTA",
    },
    {
      label: "British Columbia",
      value: "BRITISH_COLUMBIA",
    },
    {
      label: "Manitoba",
      value: "MANITOBA",
    },
    {
      label: "Newfound and Labrador",
      value: "NEWFOUNDLAND_AND_LABRADOR",
    },
    {
      label: "new Brunswick",
      value: "NEW_BRUNSWICK",
    },
    {
      label: "Northwest Territories",
      value: "NORTHWEST_TERRITORIES",
    },

    {
      label: "Nova Scotia",
      value: "NOVA_SCOTIA",
    },

    {
      label: "Nunavut",
      value: "NUNAVUT",
    },
    {
      label: "Ontario",
      value: "ONTARIO",
    },
    {
      label: "Prince Edward Island",
      value: "PRINCE_EDWARD_ISLAND",
    },
    {
      label: "Qubec",
      value: "QUEBEC",
    },
    {
      label: "Saskatchewan",
      value: "SASKATCHEWAN",
    },
    {
      label: "Yukon",
      value: "YUKON",
    },
  ];

  const roles = [
    {
      label: "Super Admin",
      value: ROLE.SUPER_ADMIN,
    },
    {
      label: "Admin",
      value: ROLE.ADMIN,
    },
  ];

  return (
    <Layout>
      <NavbarAlt />
      <div className=" p-[1rem] sm:p-[2.5rem]">
        <div className="flex justify-between items-center">
          <div className=" text-primary font-bold text-[2.5rem]">Add User</div>
        </div>

        <div className="bg-white rounded-2xl min-h-[20vh] mt-12 py-16">
          <div className=" flex flex-col justify-center w-full items-center">
            <ImageComponent
              onChange={(v: any) => setFieldValue("image", v)}
              value={values.image}
            />
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
              <DateField
                label="Date Of Birth"
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
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
            <div className="-mt-9">
              <SelectField
                label="Role"
                id="role"
                name="role"
                onChange={handleChange}
                value={values.role}
                error={touched.role && Boolean(errors.role)}
                helperText={touched.role && errors.role}
                options={roles}
              />
            </div>
            <div className="-mt-9">
              <SelectField
                label="Province"
                id="province"
                name="province"
                onChange={handleChange}
                value={values.province}
                error={touched.province && Boolean(errors.province)}
                helperText={touched.province && errors.province}
                options={regions}
              />
            </div>
            <div className="-mt-9">
              <TextField
                label="City"
                id="city"
                name="city"
                onChange={handleChange}
                value={values.city}
                error={touched.city && Boolean(errors.city)}
                helperText={touched.city && errors.city}
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
