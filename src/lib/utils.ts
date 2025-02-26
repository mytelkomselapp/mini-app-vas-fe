import Taro from "@tarojs/taro";
import { clsx, type ClassValue } from "clsx";
import moment from "moment";
import { twMerge } from "tailwind-merge";
import { StateStorage } from "zustand/middleware";
import sign from "jwt-encode";
import { END_RAMADHAN_DATE } from "../core/env";

const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
const months = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

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
  return moment()?.isAfter(END_RAMADHAN_DATE, "day")
    ? END_RAMADHAN_DATE
    : moment()?.format("YYYY-MM-DD");
};

export const getCurrentWeekRamadhan = (currentDay: string) => {
  const days = moment(currentDay)?.date();
  return Math.floor(days / 7) + 1;
};

export const getCurrentTaskStatus = (stateCurrentDay: string) => {
  const currentDay = moment()?.format("YYYY-MM-DD");

  if (moment(stateCurrentDay)?.isAfter(currentDay)) return "present";
  if (moment(stateCurrentDay)?.isBefore(currentDay)) return "past";

  return "today";
};

export const formatDateToIndonesian = (date: Date) => {
  const dayName = days[date.getDay()];
  const day = date.getDate();
  const monthName = months[date.getMonth()];
  const year = date.getFullYear();

  return {
    dayName,
    day,
    monthName,
    year,
  };
};

export const gregorianToHijri = (date: Date) => {
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  const jd =
    Math.floor((1461 * (year + 4800 + Math.floor((month - 14) / 12))) / 4) +
    Math.floor((367 * (month - 2 - 12 * Math.floor((month - 14) / 12))) / 12) -
    Math.floor(
      (3 * Math.floor((year + 4900 + Math.floor((month - 14) / 12)) / 100)) / 4
    ) +
    day -
    32075;

  const l = jd - 1948440 + 10632;
  const n = Math.floor((l - 1) / 10631);
  const r = l - 10631 * n + 354;
  const j =
    Math.floor((10985 - r) / 5316) * Math.floor((50 * r) / 17719) +
    Math.floor(r / 5670) * Math.floor((43 * r) / 15238);
  const h =
    r -
    Math.floor((30 - j) / 15) * Math.floor((17719 * j) / 50) -
    Math.floor(j / 16) * Math.floor((15238 * j) / 43) +
    29;

  const m = Math.floor((24 * h) / 709);
  const d = h - Math.floor((709 * m) / 24);
  const y = 30 * n + j - 30;

  const hijriMonths = [
    "Muharram",
    "Safar",
    "Rabi' al-awwal",
    "Rabi' al-thani",
    "Jumada al-awwal",
    "Jumada al-thani",
    "Rajab",
    "Sha'ban",
    "Ramadan",
    "Shawwal",
    "Dhu al-Qi'dah",
    "Dhu al-Hijjah",
  ];

  return {
    day: d,
    month: hijriMonths[m - 1],
    year: y,
  };
};

export const generateArrayRangeDate = (startDate: string, endDate: string) => {
  const start = moment(startDate);
  const end = moment(endDate);

  const dates: string[] = [];
  for (let date = moment(start); date.isSameOrBefore(end); date.add(1, "day")) {
    dates.push(date.format("YYYY-MM-DD"));
  }

  return dates;
};

export const formatNumberWithThousandSeparator = (num: number): string => {
  if (num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  } else {
    return "0";
  }
};

export const convertTimezone = (timezone: string): string => {
  const timezoneMap = {
    "Asia/Jakarta": "WIB", // Western Indonesian Time (UTC+7)
    "Asia/Pontianak": "WIB", // Western Indonesian Time (UTC+7)
    "Asia/Makassar": "WITA", // Central Indonesian Time (UTC+8)
    "Asia/Ujung_Pandang": "WITA", // Central Indonesian Time (UTC+8)
    "Asia/Jayapura": "WIT", // Eastern Indonesian Time (UTC+9)
  };

  return timezoneMap[timezone] || timezone;
};

export const translateTaskType = (type: "morning" | "afternoon" | "night") => {
  switch (type) {
    case "morning":
      return "pagi";
    case "afternoon":
      return "siang";
    case "night":
      return "malam";
    default:
      return type;
  }
};

export const detectPlatform = () => {
  const systemInfo = Taro.getSystemInfoSync();
  const system = systemInfo.system?.toLowerCase();
  console.log("systemInfo", systemInfo);

  if (system?.includes("ios")) {
    return "ios";
  }
  if (system?.includes("android")) {
    return "android";
  }
  return "unknown";
};

export const getTimezone = () => {
  const currentDate = new Date();
  const offset = currentDate.getTimezoneOffset() / -60; // Convert to positive hours
  switch (offset) {
    case 8:
      return "WITA";
    case 9:
      return "WIT";
    default:
      return "WIB";
  }
};

export const createJWT = (payload: any, secret: string) => {
  return sign(payload, secret);
};

export const formatValidUntil = (date: string | Date) => {
  const formattedDate = formatDateToIndonesian(new Date(date));
  return `${formattedDate.day} ${formattedDate.monthName} ${formattedDate.year}`;
};
