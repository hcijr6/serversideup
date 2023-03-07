import { useAuthStore } from "~~/stores/auth";

export default defineNuxtRouteMiddleware(async function (to, from) {
  const authStore = useAuthStore();
  if (!authStore.isLoggedIn) {
    var sessionAuthorized = await authStore.checkIfSessionAuthorized();
    if (!sessionAuthorized) {
      return navigateTo("/login", { replace: true });
    }
  }
});
