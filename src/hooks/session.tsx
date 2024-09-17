import { allowedPaths } from "@/lib/Constants";
import { validateAuth } from "@/lib/utils";
import { indexRoute } from "@/router";
import { useUserStore } from "@/store/user";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const useManageSession = () => {
  // const dispatch = useDispatch();
  // const refreshToken = async () => {
  //   try {
  //     const token = localStorage.getItem("refreshToken");
  //     localStorage.setItem("isRefreshing", "true");
  //     const { data } = await refreshUserToken(token);
  //     localStorage.removeItem("isRefreshing");
  //     if (data) {
  //       localStorage.setItem("userToken", data?.data?.access_token);
  //       localStorage.setItem("refreshToken", data?.data?.refresh_token);
  //     }
  //   } catch (error) {
  //     localStorage.removeItem("isRefreshing");

  //     handleErrorAlt(error, dispatch);
  //   }
  // };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const isRefreshing = localStorage.getItem("isRefreshing");

  //     if (shouldRefresh() && !isRefreshing) {
  //       refreshToken();
  //     }
  //   }, 10000);

  //   return () => {
  //     localStorage.removeItem("isRefreshing");
  //     clearInterval(interval);
  //   };
  // }, []);

  const navigate = useNavigate();
  if (!validateAuth()) navigate({ to: indexRoute.to });
  useEffect(() => {
    const interval = setInterval(() => {
      console.info(validateAuth());
      if (!validateAuth()) navigate({ to: indexRoute.to });
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);
};

export const useManageRole = () => {
  const { user, clearUser } = useUserStore((state) => state);
  const { role } = user;
  const currentPath = useLocation().pathname;
  const navigate = useNavigate();

  console.info({ role });

  useEffect(() => {
    if (!role) {
      localStorage.removeItem("userToken");
      clearUser();
      navigate({ to: indexRoute.to });
    } else if (
      role != "SUPER_ADMIN" &&
      !allowedPaths[role].includes(currentPath)
    )
      navigate({ to: allowedPaths[role][0] });
  }, []);
};
