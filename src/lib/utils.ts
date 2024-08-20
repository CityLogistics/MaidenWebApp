import { QueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const queryClient = new QueryClient();

export function parseJwt(token: string | undefined) {
  if (!token) return;
  var base64Url = token?.split(".")[1];
  var base64 = base64Url?.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

export const validateAuth = () => {
  const token = localStorage.getItem("userToken");
  if (token && token !== "undefined") {
    const tokenData = parseJwt(token);
    const now = Date.now();
    const exp = tokenData["exp"];
    if (exp) {
      return exp > now / 1000;
    }
  }
  return false;
};

export const shouldRefresh = () => {
  const token = localStorage.getItem("userToken");

  if (token && token !== "undefined") {
    const tokenData = parseJwt(token);
    const now = Date.now();
    const exp = tokenData["exp"];
    if (exp) {
      // exp is not at least some minutes ahead of current time
      // return exp < now / 1000 + 880;
      return exp < now / 1000 + 300;
    }
  }
  return false;
};

export const parseError = (error: AxiosError) => {
  const message = error.response?.data?.message;
  if (typeof message == "string") return message;
  if (message instanceof Array) return message.join(",");
  return "An error occured";
};
