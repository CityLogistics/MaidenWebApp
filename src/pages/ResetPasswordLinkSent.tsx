import LoginImg from "../assets/images/login_bg.png";
import Logo from "../assets/images/city_logistics.png";
import Button from "@/components/Button";
import { useNavigate } from "@tanstack/react-router";
import { dashboardRoute, indexRoute } from "@/router";
import { Toaster } from "sonner";
import { validateAuth } from "@/lib/utils";
import { useEffect } from "react";

export default function ResetPasswordLinkSent() {
  const navigate = useNavigate();

  useEffect(() => {
    if (validateAuth()) navigate({ to: dashboardRoute.to });
  }, []);

  return (
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
          Reset Password Link Sent
        </div>
        <div className="opacity-80 text-[#202224] text-lg font-semibold font-['Nunito Sans']">
          An email containing instructions to reset your password has been sent
          to your email.
        </div>

        <div className="w-[min(25rem,100%)]  mt-[4.875rem]">
          <Button
            type="submit"
            text="Continue"
            onClick={() => navigate({ to: indexRoute.to })}
          />
        </div>
      </div>
    </div>
  );
}
