/// <reference types="@tarojs/taro" />

import { TaroStatic } from "@tarojs/taro";

interface CustomTaroStatic extends TaroStatic {
  invokeNativePlugin: (opts: any) => any;
}

declare const TaroCustom: CustomTaroStatic;

declare module "@tarojs/taro" {
  interface TaroStatic {
    invokeNativePlugin: (opts: any) => any;
    shareAppMessage: (opts: {
      title: string;
      path: string;
      imageUrl: string;
    }) => any;
  }
}
