import CityLogo from "@/assets/images/city_logistics.png";
import {
  Element4,
  LogoutCurve,
  Profile2User,
  Setting2,
  ShoppingCart,
  UserCirlceAdd,
} from "iconsax-react";
import { Link, useLocation } from "@tanstack/react-router";
import { twMerge } from "tailwind-merge";
import { routes } from "@/lib/Constants";
import {
  dashboardRoute,
  ordersRoute,
  driversRoute,
  newDriversRoute,
} from "@/router";

export default function SiderBar() {
  const className =
    "w-full py-2 flex justify-center  my-4 hover:border-primary  hover:border-l-4 text-[#EEEEEE] hover:text-primary text-[1.875rem] ";
  const path = useLocation().pathname;

  const pathProps = (to: any) => ({
    to,
    className: twMerge(
      className,
      path.includes(to) && "border-primary border-l-4 text-primary"
    ),
  });

  return (
    <div className="w-[6.1rem] h-svh bg-white flex flex-col justify-center py-6">
      <img src={CityLogo} alt="City Logo" className="w-[6.0rem] h-[3.5rem]" />
      <div className="pt-6">
        <Link {...pathProps(dashboardRoute.to)}>
          <Element4 variant="Bold" />
        </Link>
        <Link {...pathProps(ordersRoute.to)}>
          <ShoppingCart variant="Bold" />
        </Link>
        <Link {...pathProps(driversRoute.to)}>
          <Profile2User variant="Bold" />
        </Link>
        <Link {...pathProps(newDriversRoute.to)}>
          <UserCirlceAdd variant="Bold" />
        </Link>
      </div>
      <div className="mt-auto">
        <Link {...pathProps(routes.SETTINGS)}>
          <Setting2 variant="Bold" />
        </Link>
        <Link {...pathProps("")}>
          <LogoutCurve color="grey" variant="Bold" />
        </Link>
      </div>
    </div>
  );
}