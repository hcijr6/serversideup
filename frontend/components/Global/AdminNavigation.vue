<template>
  <div
    class="flex flex-col items-end gap-3 border rounded-lg p-3 drop-shadow-sm bg-white z-50 transition-all absolute"
    :class="[opened ? ' w-[20vw]' : 'w-[3.7rem]', 'nav-height']"
  >
    <div class="flex justify-between w-full">
      <Transition>
        <span class="text-2xl font-semibold" v-show="opened"> Hi, Hernán </span>
      </Transition>
      <span
        class="p-1 border h-fit rounded-md hover:border-gray-800 transition-all cursor-pointer w-fit justify-center flex"
        @click="opened = !opened"
      >
        <Bars3Icon class="h-6 w-6"></Bars3Icon>
      </span>
    </div>

    <div class="flex flex-col w-full gap-1">
      <span
        class="group rounded-md hover:border-gray-800 transition-all cursor-pointer w-full justify-start flex gap-3"
        :class="[opened ? 'p-2 border' : '']"
      >
        <span
          class="rounded-md border flex justify-center items-center hover:border-gray-800 transition-all drop-shadow-sm"
          :class="[
            opened
              ? 'p-2 bg-white text-gray-800 group-hover:border-gray-800 '
              : 'h-8 w-full ',
          ]"
        >
          <UsersIcon :class="['h-4 w-4 ']"></UsersIcon>
        </span>
        <Transition>
          <span v-show="opened" class="flex items-center">
            <NuxtLink to="/tasks" class="text-lg font-semibold">Tasks</NuxtLink>
          </span>
        </Transition>
      </span>
      <span
        class="group rounded-md hover:border-gray-800 transition-all cursor-pointer w-full justify-start flex gap-3"
        :class="[opened ? 'p-2 border' : '']"
      >
        <span
          class="rounded-md border flex justify-center items-center hover:border-gray-800 transition-all drop-shadow-sm"
          :class="[
            opened
              ? 'p-2 bg-white text-gray-800 group-hover:border-gray-800 '
              : 'h-8 w-full ',
          ]"
        >
          <UsersIcon :class="['h-4 w-4 ']"></UsersIcon>
        </span>
        <Transition>
          <span v-show="opened" class="flex items-center">
            <NuxtLink to="/users" class="text-lg font-semibold">Users</NuxtLink>
          </span>
        </Transition>
      </span>
      <span
        class="group rounded-md hover:border-gray-800 transition-all cursor-pointer w-full justify-start flex gap-3"
        :class="[opened ? 'p-2 border' : '']"
      >
        <span
          class="rounded-md border flex justify-center items-center hover:border-gray-800 transition-all drop-shadow-sm"
          :class="[
            opened
              ? 'p-2 bg-white text-gray-800 group-hover:border-gray-800 '
              : 'h-8 w-full ',
          ]"
        >
          <UsersIcon :class="['h-4 w-4 ']"></UsersIcon>
        </span>
        <Transition>
          <span v-show="opened" class="flex items-center">
            <span @click="logout" class="text-lg font-semibold">Logout</span>
          </span>
        </Transition>
      </span>
    </div>
  </div>
</template>
<script>
import { Bars3Icon } from "@heroicons/vue/24/solid";
import { UsersIcon } from "@heroicons/vue/24/outline";
import { useAuthStore } from '~~/stores/auth';

export default {
  setup() {
    const authStore = useAuthStore()
    return { authStore }
  },
  data() {
    return {
      opened: false,
    };
  },

  components: {
    Bars3Icon,
    UsersIcon,
  },
  methods:{
    async logout(){
      await this.authStore.logout();
      navigateTo("/login", { replace: true });
    }
  }
};
</script>
<style>
.nav-height {
  height: calc(100vh - 2.5em);
}
.v-enter-active,
.v-leave-active {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
<!-- flex border rounded-lg h-full p-3 drop-shadow-sm bg-white z-50 hover:w-[25vw] transition-all -->
