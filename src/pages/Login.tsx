import PasswordField from "../components/PasswordField";
import TextField from "../components/TextField";
import LoginImg from "../assets/images/login_bg.png";
import Logo from "../assets/images/city_logistics.png";
import Button from "@/components/Button";

export default function Login() {
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
        <TextField label="Email address:" />
        <PasswordField
          label="Password"
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
          <Button text="Sign In" />
        </div>
      </div>
    </div>
  );
}
