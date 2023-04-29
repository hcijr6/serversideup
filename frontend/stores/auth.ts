import { defineStore } from "pinia";
type User = {
  name: string;
  email?: string;
  permission: string;
  email_verified_at: string;
};
export const useAuthStore = defineStore("auth_store", {
  state: () => ({
    user: null,
  }),
  actions: {
    async login(credentials: object) {
      var response = await $larafetch("/login", {
        response: true,
        method: "post",
        body: credentials,
      });
      if (!response.ok && response._data && response._data.errors) {
        response.formErrors = true;
      } else {
        response.formErrors = false;
      }
      return response;
    },
    async register(credentials: object) {
      var response = await $larafetch("/register", {
        response: true,
        method: "post",
        body: credentials,
      });
      if (!response.ok && response._data && response._data.errors) {
        response.formErrors = true;
      } else {
        response.formErrors = false;
      }
      return response;
    },
    async checkIfSessionAuthorized() {
      try{
        var response:any = await $larafetch("/api/v1/user", { response: true });
        this.user = response;
        return true;
      } catch (error){
        return false;
      }
    },
    async logout() {
      if (!this.isLoggedIn) return;
      await $larafetch("/logout", { method: "post" });
      this.user = null;
    }
  },
  getters: {
    isLoggedIn: function (state) {
      if (state.user && state.user.name) {
        return true;
      } else {
        return false;
      }
    },
  },
});
