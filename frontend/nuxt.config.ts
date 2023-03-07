// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@vueuse/nuxt",'@pinia/nuxt'],
  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.API_BASE_URL,
      BASE_URL: process.env.BASE_URL,
    },
  },
  imports: {
    dirs: ["./utils"]
  }
});
