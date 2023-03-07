<template>
  <div
    class="py-8 min-h-screen px-8 mx-auto max-w-screen-xl text-center lg:py-8 lg:px-12 flex justify-center items-center"
  >
    <div
      class="flex h-full flex-col gap-2 w-fit p-10 border-black border-[1px]"
    >
      <div class="flex flex-col justify-start items-start">
        <span class="font-bold text-2xl">Login</span>
      </div>
      <div class="flex flex-col justify-start items-start">
        <label for="">Email</label>
        <input
          type="text"
          name="mail"
          placeholder="Email"
          autocomplete="off"
          v-model="this.form.email"
        />
        <span
          v-for="message in this.validations.email"
          class="text-red-500 text-xs"
          >{{ message }}</span
        >
      </div>
      <div class="flex flex-col justify-start items-start">
        <label for="">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          autocomplete="off"
          v-model="this.form.password"
        />
        <span
          v-for="message in this.validations.password"
          class="text-red-500 text-xs"
          >{{ message }}</span
        >
      </div>
      <div class="flex flex-col justify-start items-start mt-2">
        <button @click="thisLogin" class="py-2 px-3 w-full bg-black text-white">
          Submit
        </button>
      </div>
      <div class="flex flex-col justify-start items-start mt-2">
        <NuxtLink class="text-xs underline" to="/register">You already have an account?</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '~~/stores/auth';

export default {
  setup() {
    const authStore = useAuthStore()
    return { authStore }
  },
  data() {
    return {
      form: {
        email: "hcijrfed6@gmail.com",
        password: "hcijr6@gmail.com",
      },
      validations: {
        email: [],
        password: [],
      },
    };
  },
  methods: {
    async thisLogin() {
      const credentials = {
        email: this.form.email,
        password: this.form.password,
      };
      var response = await this.authStore.login(credentials);
      if (!response.ok && response._data && response._data.errors) {
        Object.keys(response._data.errors).forEach((key) => {
            this.validations[key] = response._data.errors[key];
        });
      } else {
        this.authStore.user=response;
        navigateTo('/')
      }
    },
    resetErrors() {
      
    },
  },
};
</script>
