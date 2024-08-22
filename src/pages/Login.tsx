import PasswordField from "../components/PasswordField";
import TextField from "../components/TextField";
import LoginImg from "../assets/images/login_bg.png";
import Logo from "../assets/images/city_logistics.png";
import Button from "@/components/Button";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/apis/auth";
import { useFormik } from "formik";
import { useNavigate } from "@tanstack/react-router";
import { dashboardRoute } from "@/router";
import * as yup from "yup";
import { useUserStore } from "@/store/user";

export default function Login() {
  const navigate = useNavigate();

  const { updateUser } = useUserStore((state) => state);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      updateUser(data.data.user);
      navigate({ to: dashboardRoute.to });
    },
  });

  const validationSchema = yup.object().shape({
    email: yup.string().email().required("this field is required"),
    password: yup.string().required("this field is required"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const { handleSubmit, handleChange, values, errors, touched } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (data) => {
      console.info({ data });

      mutateAsync(data);
    },
  });

  return (
    <div
      className=" bg-white h-screen w-screen bg-cover flex justify-center items-center"
      style={{ backgroundImage: `url(${LoginImg})` }}
    >
      <div className="bg-white  w-[38rem] rounded-2xl flex flex-col items-center p-[3.75rem]">
        <img
          src={Logo}
          alt="City Logo"
          className="w-[7.5rem] h-[3.75rem] bg-cover"
        />
        <div className="text-[#202224] text-[2rem] font-bold font-['Nunito Sans']">
          Login to Account
        </div>
        <div className="opacity-80 text-[#202224] text-lg font-semibold font-['Nunito Sans']">
          Please enter your email and password to continue
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
        <PasswordField
          label="Password"
          id="password"
          name="password"
          onChange={handleChange}
          value={values.password}
          error={touched.password && Boolean(errors.password)}
          helperText={touched.password && errors.password}
          itemRight={
            <span className="text-[#202224] text-lg opacity-60">
              Forget Password?
            </span>
          }
        />
        <span className=" text-[#202224] text-lg opacity-60 mt-6 text-left w-full">
          Remember Password
        </span>

        <div className="w-[25rem]  mt-[4.875rem]">
          <Button loading={isPending} text="Sign In" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
}
