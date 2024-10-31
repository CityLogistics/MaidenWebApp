import CityLogo from "@/assets/images/city_logistics.png";
import {
  Element4,
  LogoutCurve,
  Note,
  Profile2User,
  Setting2,
  ShoppingCart,
  People,
  UserCirlceAdd,
  Map,
  ShoppingBag,
} from "iconsax-react";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { twMerge } from "tailwind-merge";
import { routes } from "@/lib/Constants";
import {
  dashboardRoute,
  ordersRoute,
  driversRoute,
  newDriversRoute,
  indexRoute,
  transactionsRoute,
  usersRoute,
  citiesRoute,
  manualOrdersRoute,
} from "@/router";
import { useUserStore } from "@/store/user";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export default function SiderBar() {
  const role = useUserStore((state) => state.user.role);

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

  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("userToken");
    navigate({ to: indexRoute.to });
  };

  return (
    <TooltipProvider>
      <div className="w-[3.5rem] md:w-[6.1rem] h-svh bg-white flex flex-col justify-center py-6">
        <img src={CityLogo} alt="City Logo" className="w-[6.0rem] h-[3.5rem]" />
        <div className="pt-6">
          {role == "SUPER_ADMIN" && (
            <>
              <Tooltip>
                <TooltipTrigger className=" bg-transparent border-none p-0 w-full">
                  <Link {...pathProps(dashboardRoute.to)}>
                    <Element4 variant="Bold" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent className="bg-white text-primary">
                  <p>Dashboard</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger className=" bg-transparent border-none p-0 w-full">
                  <Link {...pathProps(ordersRoute.to)}>
                    <ShoppingCart variant="Bold" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent className="bg-white text-primary">
                  <p>Order List</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger className=" bg-transparent border-none p-0 w-full">
                  <Link {...pathProps(manualOrdersRoute.to)}>
                    <ShoppingBag variant="Bold" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent className="bg-white text-primary">
                  <p>Manual Order List</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger className=" bg-transparent border-none p-0 w-full">
                  <Link {...pathProps(driversRoute.to)}>
                    <Profile2User variant="Bold" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent className="bg-white text-primary">
                  <p>Driver List</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger className=" bg-transparent border-none p-0 w-full">
                  <Link {...pathProps(newDriversRoute.to)}>
                    <UserCirlceAdd variant="Bold" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent className="bg-white text-primary">
                  <p>New Driver List</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger className=" bg-transparent border-none p-0 w-full">
                  <Link {...pathProps(transactionsRoute.to)}>
                    <Note variant="Bold" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent className="bg-white text-primary">
                  <p>Transactions</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger className=" bg-transparent border-none p-0 w-full">
                  <Link {...pathProps(usersRoute.to)}>
                    <People variant="Bold" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent className="bg-white text-primary">
                  <p>User List</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger className=" bg-transparent border-none p-0 w-full">
                  <Link {...pathProps(citiesRoute.to)}>
                    <Map variant="Bold" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent className="bg-white text-primary">
                  <p>City List</p>
                </TooltipContent>
              </Tooltip>
            </>
          )}
          {role == "ADMIN" && (
            <>
              <Tooltip>
                <TooltipTrigger className=" bg-transparent border-none p-0 w-full">
                  <Link {...pathProps(ordersRoute.to)}>
                    <ShoppingCart variant="Bold" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent className="bg-white text-primary">
                  <p>Order List</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger className=" bg-transparent border-none p-0 w-full">
                  <Link {...pathProps(driversRoute.to)}>
                    <Profile2User variant="Bold" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent className="bg-white text-primary">
                  <p>Driver List</p>
                </TooltipContent>
              </Tooltip>
            </>
          )}
          {role == "DRIVER" && (
            <>
              <Tooltip>
                <TooltipTrigger className=" bg-transparent border-none p-0 w-full">
                  <Link {...pathProps(ordersRoute.to)}>
                    <ShoppingCart variant="Bold" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent className="bg-white text-primary">
                  <p>Order List</p>
                </TooltipContent>
              </Tooltip>
            </>
          )}
        </div>
        <div className="mt-auto">
          <Tooltip>
            <TooltipTrigger className=" bg-transparent border-none p-0 w-full">
              <Link {...pathProps(routes.SETTINGS)}>
                <Setting2 variant="Bold" />
              </Link>
            </TooltipTrigger>
            <TooltipContent className="bg-white text-primary">
              <p>Settings</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger className=" bg-transparent border-none p-0 w-full focus:border-none">
              <div
                className="w-full py-2 flex justify-center  my-4 hover:border-primary  hover:border-l-4 text-[#EEEEEE] hover:text-primary text-[1.875rem]  cursor-pointer"
                onClick={logOut}
              >
                <LogoutCurve color="grey" variant="Bold" />
              </div>
            </TooltipTrigger>
            <TooltipContent className="bg-white text-primary">
              <p>Logout</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
}
