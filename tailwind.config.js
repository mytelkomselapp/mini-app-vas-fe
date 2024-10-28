/** @type {import('tailwindcss').Config} */
module.exports = {
  // 这里给出了一份 taro 通用示例，具体要根据你自己项目的目录结构进行配置
  // 比如你使用 vue3 项目，你就需要把 vue 这个格式也包括进来
  // 不在 content glob 表达式中包括的文件，在里面编写 tailwindcss class，是不会生成对应的 css 工具类的
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  prefix: "",
  // 其他配置项 ...
  corePlugins: {
    // 小程序不需要 preflight，因为这主要是给 h5 的，如果你要同时开发多端，你应该使用 process.env.TARO_ENV 环境变量来控制它
    preflight: false,
  },
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      maxWidth: {
        "mobile-screen": "425px",
      },
      fontFamily: {
        sans: ["Poppins"],
        batikSans: ["TelkomselBatikSans", "sans-serif"],
      },
      backgroundSize: {
        bannerImage: "100% 190px",
      },
      colors: {
        primaryBlack: "#181C21",
        grey: "#757F90",
        shadesGrey: "#EDECF0",
        shadesBlack: "#001122",
        secondaryBlue: "rgb(213, 226, 245)",
        primaryRed: "rgba(237, 2, 38, 1)",
        textError: "#FF0025",
        inactiveGrey: "#eff1f4",
        inputGroup: "#fafafb",
        blueNavy: "#001A41",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        solidRed: "#ED0226",
        successGreen: "#008E53",
        primary: {
          DEFAULT: "#001A41",
          foreground: "white",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        "rute-active": "#F1F1F1", // lighter gray
        "id-inactive": "#B0B0B0", // darker gray
        textSecondary: "#757F90",
        dividerGrey: "#dae0e9",
        disabled: "#9CA9B9",
        backdrop: "rgba(0, 0, 0, 0.5)",
      },
    },
  },
}