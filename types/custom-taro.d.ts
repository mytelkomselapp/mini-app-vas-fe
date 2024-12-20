/// <reference types="@tarojs/taro" />

import { TaroStatic } from "@tarojs/taro";

interface CustomTaroStatic extends TaroStatic {
  invokeNativePlugin: (opts: any) => any;
}

declare const TaroCustom: CustomTaroStatic;

export default TaroCustom;
