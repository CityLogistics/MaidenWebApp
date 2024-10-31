import TextField from "../components/TextField";
import LoginImg from "../assets/images/login_bg.png";
import Logo from "../assets/images/city_logistics.png";
import Button from "@/components/Button";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "@/apis/auth";
import { useFormik } from "formik";
import { useNavigate } from "@tanstack/react-router";
import { dashboardRoute, resetPasswordLinkSentRoute } from "@/router";
import * as yup from "yup";
import { toast, Toaster } from "sonner";
import { AxiosError } from "axios";
import { parseError, validateAuth } from "@/lib/utils";
import { useEffect } from "react";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: forgotPassword,
    onSuccess: (_) => {
      navigate({ to: resetPasswordLinkSentRoute.to });
    },
    onError: (e: AxiosError) => {
      toast.error(parseError(e));
    },
  });

  const validationSchema = yup.object().shape({
    email: yup.string().email().required("this field is required"),
  });

  const initialValues = {
    email: "",
  };

  const { handleSubmit, handleChange, values, errors, touched } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (data) => {
      console.info({ data });

      mutateAsync({ email: data.email.toLowerCase() });
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
            Forgot Password
          </div>
          <div className="opacity-80 text-[#202224] text-lg font-semibold font-['Nunito Sans']">
            Please enter your email to continue
          </div>
          <TextField
            label="Email address:"
            id="email"
            name="email"
            onChange={handleChange}
            value={values.email}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
          />

          <div className="w-[min(25rem,100%)]  mt-[4.875rem]">
            <Button
              type="submit"
              loading={isPending}
              text="Continue"
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </form>
  );
}
