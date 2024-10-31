import { defineConfig, type UserConfigExport } from "@tarojs/cli";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import devConfig from "./dev";
import prodConfig from "./prod";
import type { Plugin } from "vite";
import tailwindcss from "tailwindcss";
import { UnifiedViteWeappTailwindcssPlugin as uvtw } from "weapp-tailwindcss/vite";
import { DefinePlugin } from "webpack";
const { UnifiedWebpackPluginV5 } = require("weapp-tailwindcss/webpack");

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
    plugins: ["@tarojs/plugin-html"],
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
          name: "define-process",
          apply: "build",
          config: () => ({
            define: {
              "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
              "process.env": JSON.stringify(process.env),
              "process.browser": JSON.stringify(true),
            },
          }),
        },
      ],
    },
    mini: {
      webpackChain(chain) {
        chain.plugin("define").use(DefinePlugin, [
          {
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
            "process.env": JSON.stringify(process.env),
            "process.browser": JSON.stringify(true),
          },
        ]);
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
    h5: {
      webpackChain(chain) {
        chain.plugin("define").use(DefinePlugin, [
          {
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
            "process.env": JSON.stringify(process.env),
            "process.browser": JSON.stringify(true),
          },
        ]);
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
  };

  // Merge the base config with environment-specific configs
  return merge(baseConfig, command === "build" ? prodConfig : devConfig);
});
