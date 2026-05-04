// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

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
  app: {
    head: {
      title: "Marsa Escape Tours",
      meta: [
        {
          name: "description",
          content:
            "Private transfers, excursions, safari trips, snorkeling, and airport transport in Marsa Alam.",
        },

        // Open Graph
        {
          property: "og:title",
          content: "Marsa Escape Tours",
        },
        {
          property: "og:description",
          content:
            "Book private transfers, excursions, safari trips, snorkeling, and airport transport in Marsa Alam.",
        },
        {
          property: "og:type",
          content: "website",
        },
        {
          property: "og:url",
          content: "https://www.marsascapetours.tours",
        },
        {
          property: "og:image",
          content: "https://www.marsascapetours.tours/logo.png",
        },

        // Twitter / X
        {
          name: "twitter:card",
          content: "summary_large_image",
        },
        {
          name: "twitter:title",
          content: "Marsa Escape Tours",
        },
        {
          name: "twitter:description",
          content:
            "Private transfers, excursions, safari trips, snorkeling, and airport transport in Marsa Alam.",
        },
        {
          name: "twitter:image",
          content: "https://www.marsascapetours.tours/logo.png",
        },
      ],
    },
  },
});
