import { QueryClient } from "@tanstack/react-query";
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

export const parseError = (error: any) => {
  const message = error.response?.data?.message;
  if (typeof message == "string") return message;
  if (message instanceof Array) return message.join(",");
  return "An error occured";
};

export const timeFormNow = (date: any) => {
  if (typeof date !== "object") {
    date = new Date(date);
  }

  var seconds = Math.floor((+new Date() - date) / 1000);
  var intervalType;

  var interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    intervalType = "year";
  } else {
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      intervalType = "month";
    } else {
      interval = Math.floor(seconds / 86400);
      if (interval >= 1) {
        intervalType = "day";
      } else {
        interval = Math.floor(seconds / 3600);
        if (interval >= 1) {
          intervalType = "hour";
        } else {
          interval = Math.floor(seconds / 60);
          if (interval >= 1) {
            intervalType = "minute";
          } else {
            interval = seconds;
            intervalType = "second";
          }
        }
      }
    }
  }

  if (interval > 1 || interval === 0) {
    intervalType += "s";
  }

  return interval + " " + intervalType;
};
