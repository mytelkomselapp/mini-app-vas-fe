import { defineConfig, type UserConfigExport } from "@tarojs/cli";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import devConfig from "./dev";
import prodConfig from "./prod";
import type { Plugin } from "vite";
import tailwindcss from "tailwindcss";
import { UnifiedViteWeappTailwindcssPlugin as uvtw } from "weapp-tailwindcss/vite";
const { UnifiedWebpackPluginV5 } = require("weapp-tailwindcss/webpack");

// https://taro-docs.jd.com/docs/next/config#defineconfig-辅助函数
export default defineConfig<"vite">(async (merge, { command, mode }) => {
  const path = require("path");

  module.exports = {
    alias: {
      "@": path.resolve(__dirname, "..", "src"),
      components: path.resolve(__dirname, "..", "src/components"),
      modules: path.resolve(__dirname, "..", "src/modules"),
    },
  };
  const baseConfig: UserConfigExport<"vite"> = {
    projectName: "originTaro",
    date: "2024-10-19",
    designWidth: 375, // Set for mobile screen width to ensure consistency
    deviceRatio: {
      375: 1, // Standard mobile screen size with a responsive scaling ratio
      750: 1, // Larger screens like iPhone with default scaling
    },
    sourceRoot: "src",
    outputRoot: "dist",
    plugins: [],
    defineConstants: {},
    copy: {
      patterns: [],
      options: {},
    },
    framework: "react",
    compiler: {
      type: "vite",
      vitePlugins: [
        {
          // 通过 vite 插件加载 postcss,
          name: "postcss-config-loader-plugin",
          config(config) {
            // 加载 tailwindcss
            if (typeof config.css?.postcss === "object") {
              config.css?.postcss.plugins?.unshift(tailwindcss());
            }
          },
        },
        uvtw({
          // rem转rpx
          rem2rpx: true,
          // 除了小程序这些，其他平台都 disable
          disabled:
            process.env.TARO_ENV === "h5" ||
            process.env.TARO_ENV === "harmony" ||
            process.env.TARO_ENV === "rn",
        }),
      ] as Plugin[], // 从 vite 引入 type, 为了智能提示
    },
    mini: {
      postcss: {
        pxtransform: {
          enable: true,
          config: {},
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: "module", // 转换模式，取值为 global/module
            generateScopedName: "[name]__[local]___[hash:base64:5]",
          },
        },
      },
      webpackChain(chain) {
        chain.module
          .rule("svg")
          .test(/\.svg$/)
          .use("babel-loader")
          .loader("babel-loader")
          .end()
          .use("@svgr/webpack")
          .loader("@svgr/webpack")
          .options({
            svgo: false,
          });
      },
    },
    h5: {
      publicPath: "/",
      staticDirectory: "static",

      miniCssExtractPluginOption: {
        ignoreOrder: true,
        filename: "css/[name].[hash].css",
        chunkFilename: "css/[name].[chunkhash].css",
      },
      postcss: {
        autoprefixer: {
          enable: true,
          config: {},
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: "module", // 转换模式，取值为 global/module
            generateScopedName: "[name]__[local]___[hash:base64:5]",
          },
        },
      },
      webpackChain(chain) {
        chain.merge({
          plugin: {
            install: {
              plugin: UnifiedWebpackPluginV5,
              args: [
                {
                  appType: "taro",
                  // 下面个配置，会开启 rem -> rpx 的转化
                  rem2rpx: true,
                },
              ],
            },
          },
        });
        chain.module
          .rule("svg")
          .test(/\.svg$/)
          .use("babel-loader")
          .loader("babel-loader")
          .end()
          .use("@svgr/webpack")
          .loader("@svgr/webpack")
          .options({
            svgo: false,
          });
      },
    },
    rn: {
      appName: "taroDemo",
      postcss: {
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        },
      },
    },
  };
  if (process.env.NODE_ENV === "development") {
    // 本地开发构建配置（不混淆压缩）
    //  return merge({}, baseConfig, devConfig);
    return merge({}, baseConfig);
  }
  // 生产构建配置（默认开启压缩混淆等）
  return merge({}, baseConfig, prodConfig);
});
