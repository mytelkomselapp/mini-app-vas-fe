import Taro from "@tarojs/taro";
import { StateStorage } from "zustand/middleware";

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
