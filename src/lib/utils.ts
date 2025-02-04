import Taro from "@tarojs/taro";
import { clsx, type ClassValue } from "clsx";
import moment from "moment";
import { twMerge } from "tailwind-merge";
import { StateStorage } from "zustand/middleware";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCookie(key: string) {
  const b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
  return b ? b.pop() : "";
}

export const toBase64 = async (files: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(new Blob([files], { type: files?.type }));
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });
};

export const urlToFile = (fileUrl: string, fileName: string) => {
  return new Promise(async (resolve, reject) => {
    await fetch(fileUrl)
      ?.then(async (r) => {
        const blob = await r.blob();
        const files = new File([blob], fileName);
        resolve(files);
      })
      .catch((_) => reject("Converting image error..."));
  });
};

/**
 * Convert file path to Blob or File
 * @param {string} filePath - The local file path
 * @returns {Promise<Blob>}
 */
export const filePathToBlob = (filePath) => {
  return new Promise((resolve, reject) => {
    const fs = Taro.getFileSystemManager();
    fs.readFile({
      filePath,
      success: (res) => {
        const blob = new Blob([res.data], { type: "image/jpeg" }); // Adjust MIME type as needed
        console.log({ blob });
        resolve(blob);
      },
      fail: (err) => {
        console.error("Failed to read file:", err);
        reject(err);
      },
    });
  });
};

export const flightStateAttribute = (data: string | undefined) => {
  // Status: schedule/delay/cancel/diversion/return/departure/arrival/diverted
  switch (data) {
    case "delay":
      return {
        className: "!text-[#fda22b] !bg-[#fff1df]",
        label: data,
      };
    case "cancel":
      return {
        className: "!text-[#ed0226] !bg-[#fef2f4]",
        label: data + "ed",
      };

    case "arrival":
      return {
        className: "!text-[#008e53] !bg-[#e5f4ee]",
        label: "arrived",
      };

    case "schedule":
      return {
        className: "!text-[#0452ad]  !bg-[#deebfb]",
        label: "On Schedule",
      };
    default:
      return { className: "text-[#0452ad] !bg-[#dfebfb]", label: data };
  }
};

export const getMobileOperatingSystem = () => {
  var userAgent = navigator.userAgent;

  // Windows Phone must come first because its UA also contains "Android"
  if (/windows phone/i.test(userAgent)) {
    return "Windows Phone";
  }

  if (/android/i.test(userAgent)) {
    return "Android";
  }

  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  if (/iPad|iPhone|iPod/.test(userAgent)) {
    return "iOS";
  }

  return "unknown";
};

export const numberToRupiah = (value: number, mantissa: number = 0) => {
  const currency = new Intl.NumberFormat("id-ID", {
    currency: "IDR",
    maximumFractionDigits: mantissa,
  }).format(value);

  return `Rp${currency?.replace(" ", "")}`;
};

export const isEmpty = (value: string) => {
  return value?.trim()?.length <= 0;
};

export const isBetweenRange = (value: string, min: number, max: number) => {
  const valueLength = value?.length;

  return valueLength >= min && valueLength <= max;
};

export const isValidEmail = (value: string) => {
  const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (pattern.test(value)) return true;

  return false;
};

export const handleNavigate = (
  pathname: string,
  search: string = "",
  state?: any
) => {
  if (state) {
    Taro.setStorageSync(pathname, state);
  }
  Taro.navigateTo({
    url: pathname + search,
  });
};

export const TaroStorage: StateStorage = {
  setItem: (name: string, value: string) => {
    return Taro.setStorageSync(name, value);
  },
  getItem: (name: string) => {
    return Taro.getStorageSync(name);
  },
  removeItem: (name: string) => {
    return Taro.removeStorageSync(name);
  },
};

export const getNavigateState = (pathname: string) => {
  const _pathname = pathname.startsWith("/") ? pathname : "/" + pathname;
  const state = Taro.getStorageSync(_pathname);
  Taro.removeStorageSync(_pathname);
  return state;
};

export const generateCalendarByMonth = (currentMonth: any) => {
  const startOfMonth = currentMonth.clone().startOf("month");
  const endOfMonth = currentMonth.clone().endOf("month");

  const startOfWeek = startOfMonth.clone().startOf("week");
  const endOfWeek = endOfMonth.clone().endOf("week");

  const days = [];
  let day = startOfWeek.clone();

  while (day.isBefore(endOfWeek, "day")) {
    days.push(day.clone() as never);
    day.add(1, "day");
  }

  days?.shift();

  return days;
};

export const svgToBase64 = (svgString) => {
  return `data:image/svg+xml;base64,${btoa(
    unescape(encodeURIComponent(svgString))
  )}`;
};

export const getCurrentDayRamadhan = () => {
  return moment()?.isBefore("2025-03-01", "day")
    ? "2025-03-01"
    : moment()?.format();
};

export const getCurrentWeekRamadhan = (currentDay: string) => {
  const days = moment(currentDay)?.date();
  return Math.floor(days / 7) + 1;
};

export const getCurrentTaskStatus = (stateCurrentDay: string) => {
  const currentDay = "2025-03-01";

  if (moment(stateCurrentDay)?.isAfter(currentDay)) return "present";
  if (moment(stateCurrentDay)?.isBefore(currentDay)) return "past";

  return "today";
};
