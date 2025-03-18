import Taro from "@tarojs/taro";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const getCookie = (key: string) => {
  const b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
  return b ? b.pop() : "";
};

export const numberToRupiah = (value: number, mantissa: number = 0) => {
  const currency = new Intl.NumberFormat("id-ID", {
    currency: "IDR",
    maximumFractionDigits: mantissa,
  }).format(value);

  return `Rp${currency?.replace(" ", "")}`;
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

const getElementSize = (selector: string): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      Taro.createSelectorQuery()
        .select(selector)
        .boundingClientRect((res) => {
          resolve(res || null);
        })
        .exec();
    }, 200);
  });
};

export default getElementSize;
