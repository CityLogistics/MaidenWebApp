import { changePassword } from "@/apis/auth";
import Button from "@/components/Button";
import Layout from "@/components/Layout";
import NavbarAlt from "@/components/NavbarAlt";
import PasswordField from "@/components/PasswordField";
import { parseError } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import { toast } from "sonner";
import * as yup from "yup";

export default function ChangePassword() {
  const validationSchema = yup.object().shape({
    password: yup.string().required("this field is required"),
    newPassword: yup.string().required("this field is required"),
    confirmNewPassword: yup
      .string()
      .required("this field is required")
      .oneOf([yup.ref("newPassword")], "Passwords must match"),
  });

  const { handleSubmit, handleChange, values, errors, touched, resetForm } =
    useFormik({
      initialValues: {
        password: "",
        newPassword: "",
        confirmNewPassword: "",
      },
      validationSchema,
      onSubmit: (data) => {
        const { newPassword, password } = data;
        mutateAsync({
          password,
          newPassword,
        });
      },
    });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: changePassword,
    onSuccess: (_) => {
      resetForm();
      toast.success("Password saved successfully");
    },
    onError: (e: AxiosError) => {
      toast.error(parseError(e));
    },
  });

  return (
    <Layout>
      <NavbarAlt />
      <div className="p-[2.5rem]">
        <div className="flex justify-between items-center">
          <div className=" text-primary font-bold text-[2.5rem]">
            Change Password
          </div>
        </div>

        <div className="bg-white rounded-2xl min-h-[20vh] mt-12 py-16">
          <div className="w-8/12 sm:w-[25rem]  mt-[4.875rem] mx-auto">
            <div className=" mb-12">
              <div className="-mt-9">
                <PasswordField
                  label="Old Password"
                  id="password"
                  name="password"
                  onChange={handleChange}
                  value={values.password}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
              </div>
              <div className="">
                <PasswordField
                  label="New Password"
                  id="newPassword"
                  name="newPassword"
                  onChange={handleChange}
                  value={values.newPassword}
                  error={touched.newPassword && Boolean(errors.newPassword)}
                  helperText={touched.newPassword && errors.newPassword}
                />
              </div>
              <div className="">
                <PasswordField
                  label="Confirm New Password"
                  id="confirmNewPassword"
                  name="confirmNewPassword"
                  onChange={handleChange}
                  value={values.confirmNewPassword}
                  error={
                    touched.confirmNewPassword &&
                    Boolean(errors.confirmNewPassword)
                  }
                  helperText={
                    touched.confirmNewPassword && errors.confirmNewPassword
                  }
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
