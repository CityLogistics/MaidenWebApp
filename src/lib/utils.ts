import { QueryClient } from "@tanstack/react-query";
import { type ClassValue, clsx } from "clsx";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { carTypes } from "./Constants";
import axios from "axios";

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_ACCESS_KEY;

declare const window: any;

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
      .map(function (c: any) {
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

export const formatCurrencyvalue = (val: number) =>
  val?.toLocaleString("en-CA", {
    style: "currency",
    currency: "CAD",
  }) ?? "$0";

export function formatPhoneNumber(phone: any) {
  let l = phone.length;
  return "+1" + (l == 11 ? phone.substring(1, l) : phone);
}

export const openWidget = (setFile: any) => {
  var myWidget =
    window.cloudinary &&
    window.cloudinary.createUploadWidget(
      {
        cloudName: "workstedi",
        uploadPreset: "lm1ip4fw",
        api_key: "455779734655193",
        multiple: false,
        maxFileSize: 1048576,
      },
      (error: any, result: any) => {
        if (!error && result && result.event === "success") {
          setFile(result.info.secure_url);
        }
      }
    );
  myWidget?.open();
};

export const useCloudinary = (setFile: any) => {
  const [loading, setLoading] = useState(false);

  const launchWidget = () => {
    var myWidget =
      window.cloudinary &&
      window.cloudinary.createUploadWidget(
        {
          cloudName: "workstedi",
          uploadPreset: "lm1ip4fw",
          api_key: "455779734655193",
          multiple: false,
          maxFileSize: 1048576,
        },
        (error: any, result: any) => {
          setLoading(false);

          if (!error && result && result.event === "success") {
            setFile(result.info.secure_url);
          }
        }
      );
    if (myWidget) {
      setLoading(true);
      myWidget?.open();
    }
  };

  return {
    loading,
    launchWidget,
  };
};

export const getVehicleLabel = (vehicleType: any) =>
  carTypes.find((v: any) => v.value == vehicleType)?.label;

export async function getCitiesInProvince(province: string) {
  const query = `cities in ${province}`;
  let url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${apiKey}`;

  const allCities = [];

  try {
    let moreResults = true;
    while (moreResults) {
      const response = await axios.get(url);
      const data = await response.data;

      if (data.status === "OK") {
        const cities = data.results.map((place: any) => place.name);
        allCities.push(...cities);

        // Check for next page
        if (data.next_page_token) {
          // Wait a short time before requesting the next page
          await new Promise((resolve) => setTimeout(resolve, 2000));
          url = `https://maps.googleapis.com/maps/api/place/textsearch/json?pagetoken=${data.next_page_token}&key=${apiKey}`;
        } else {
          moreResults = false; // No more results
        }
      } else {
        console.error("Error fetching data:", data.status);
        moreResults = false; // Stop on error
      }
    }

    return allCities;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

// Example usage
const province = "Alberta"; // Specify the province
getCitiesInProvince(province).then((cities) => {
  console.log("Cities in " + province + ":", cities);
});
