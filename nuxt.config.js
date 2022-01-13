import { I18N } from "./config/lang";

export default {
  mode: "spa",
  /*
   ** Headers of the page
   */
  head: {
    title: "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description,
      },
    ],
    // link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.jpg" }],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: ["assets/css/page-transletion.css"],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    {
      src: "@/plugins/lib-flexible",
      ssr: false,
    },
    { src: "@/plugins/i18n.js" },
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [["nuxt-i18n", I18N]],
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    postcss: {
      plugins: {
        "postcss-px2rem-exclude": {
          remUnit: 112, // 设计图为1125 * height
          remPrecision: 2, // rem的小数点后位数
          exclude: /node_modules|folder_name/i,
        },
      },
    },
    extend(config, ctx) { },
  },
};
