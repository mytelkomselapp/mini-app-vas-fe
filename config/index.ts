import { defineConfig, type UserConfigExport } from "@tarojs/cli";
// @ts-ignore
import devConfig from "./dev";
import prodConfig from "./prod";
import tailwindcss from "tailwindcss";
import { UnifiedViteWeappTailwindcssPlugin as uvtw } from "weapp-tailwindcss/vite";
import { DefinePlugin } from "webpack";
const { UnifiedWebpackPluginV5 } = require("weapp-tailwindcss/webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

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
    designWidth: 375,
    deviceRatio: {
      "640": 2.34 / 2,
      "750": 1,
      "828": 1.81 / 2,
      "375": 2 / 1,
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
      ],
    },
    mini: {
      debugReact: true,
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
        chain.optimization.usedExports(true); // Enable tree shaking
        chain.optimization.minimize(true); // Enable minification
        chain.plugin("clean").use(CleanWebpackPlugin);
        chain.plugin("analyzer").use(BundleAnalyzerPlugin);
        chain.plugin("compress").use(require("compression-webpack-plugin"), [
          {
            algorithm: "gzip", // Use gzip compression
            test: /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i,
            threshold: 10240, // Compress files larger than 10KB
            minRatio: 0.8,
          },
        ]);
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
