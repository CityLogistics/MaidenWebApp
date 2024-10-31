import PasswordField from "../components/PasswordField";
import LoginImg from "../assets/images/login_bg.png";
import Logo from "../assets/images/city_logistics.png";
import Button from "@/components/Button";
import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "@/apis/auth";
import { useFormik } from "formik";
import { useNavigate } from "@tanstack/react-router";
import { dashboardRoute, indexRoute, resetPasswordRoute } from "@/router";
import * as yup from "yup";
import { toast, Toaster } from "sonner";
import { AxiosError } from "axios";
import { parseError, validateAuth } from "@/lib/utils";
import { useEffect } from "react";

export default function ResetPassword() {
  const navigate = useNavigate();

  const { token }: any = resetPasswordRoute.useSearch();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: resetPassword,
    onSuccess: (_) => {
      toast.success("Password reset successfully");
      setTimeout(() => {
        navigate({ to: indexRoute.to });
      }, 3000);
    },
    onError: (e: AxiosError) => {
      toast.error(parseError(e));
    },
  });

  const validationSchema = yup.object().shape({
    newPassword: yup.string().required("this field is required"),
  });

  const initialValues = {
    newPassword: "",
  };

  const { handleSubmit, handleChange, values, errors, touched } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (data) => {
      mutateAsync({ token, data });
    },
  });

  useEffect(() => {
    if (validateAuth()) navigate({ to: dashboardRoute.to });
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div
        className=" bg-white h-screen w-screen bg-cover flex justify-center items-center"
        style={{ backgroundImage: `url(${LoginImg})` }}
      >
        <Toaster richColors position="top-center" />

        <div className="bg-white w-[95vw]  md:w-[38rem] rounded-2xl flex flex-col items-center p-[1rem] md:p-[3.75rem]">
          <img
            src={Logo}
            alt="City Logo"
            className="w-[7.5rem] h-[3.75rem] bg-cover"
          />
          <div className="text-[#202224] text-[2rem] font-bold font-['Nunito Sans']">
            Reset Password
          </div>
          <div className="opacity-80 text-[#202224] text-lg font-semibold font-['Nunito Sans']">
            Please enter your new password to continue
          </div>

          <PasswordField
            label="Password"
            id="newPassword"
            name="newPassword"
            onChange={handleChange}
            value={values.newPassword}
            error={touched.newPassword && Boolean(errors.newPassword)}
            helperText={touched.newPassword && errors.newPassword}
            // itemRight={
            //   <span className="text-[#202224] text-lg opacity-60">
            //     Forgot Password?
            //   </span>
            // }
          />
          {/* <span className=" text-[#202224] text-lg opacity-60 mt-6 text-left w-full">
          Remember Password
        </span> */}

          <div className="w-[min(25rem,100%)]  mt-[4.875rem]">
            <Button
              type="submit"
              loading={isPending}
              text="Reset Password"
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </form>
  );
}
