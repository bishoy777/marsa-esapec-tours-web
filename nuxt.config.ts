// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  head: {
    link: [
      {
        rel: "preload",
        as: "image",
        href: "/images/camels-walking-each-other-diani-beach-kenya 1.png",
      },
    ],
  },
  css: [
    "@/assets/css/tailwind.css",
    "@/assets/css/main.css",
    "@fortawesome/fontawesome-svg-core/styles.css",
  ],
  modules: ["@nuxtjs/tailwindcss", "nuxt-svgo"],
  svgo: {
    defaultImport: "component", // This makes it work like vite-svg-loader
  },
  runtimeConfig: {
    apiSecret: process.env.apiBase,
    public: {
      apiBase: process.env.apiBase,
    },
  },
});
