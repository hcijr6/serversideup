<script setup>
import { useUser, fetchCurrentUser } from "~/composables/useUser";
import { useAuth } from "~/composables/useAuth";
const { isLoggedIn, login, register, logout } = useAuth();

definePageMeta({
  layout: "app-layout",
});

// function register() {
  let register_credentials = {
    name: "hcijr6",
    email: "hcijr6@gmail.com",
    password: "hcijr6@gmail.com",
    password_confirmation: "hcijr6@gmail.com",
  };

  let login_credentials = {
    email: "hcijr6@gmail.com",
    password: "hcijr6@gmail.com",
  };
//   submitRequest(
//     $larafetch("/register", { method: "post", body: credentials }),
//     (data) => {
//       console.log(data);
//     },
//     (errors) => {
//       console.log(errors);
//     }
//   );
// }
// function login() {
  
//   submitRequest(
//     $larafetch("/login", { method: "post", body: credentials }),
//     (data) => {
//       console.log(data);
//     },
//     (errors) => {
//       console.log(errors);
//     }
//   );
// }
function showUser() {
  const user = useUser();
  console.log(user.value);
}
</script>

<template>
  <div v-if="isLoggedIn">
    <button
      class="bg-green-500 text-white rounded-lg px-5 py-2 mr-3"
      v-on:click="showUser()"
    >
      ShowUser
    </button>
  <button 
      class="bg-blue-500 text-white rounded-lg px-5 py-2 mr-3"
      v-on:click="logout()"
    >
      Logout
  </button>
  </div>
  
  <div v-else>
    <h1 class="text-8xl">Hola</h1>
    <button
      class="bg-red-500 rounded-lg px-5 py-2 mr-3 text-white"
      v-on:click="register(register_credentials)"
    >
      Register
    </button>
    <button
      class="bg-blue-500 text-white rounded-lg px-5 py-2 mr-3"
      v-on:click="login(login_credentials)"
    >
      Login
    </button>
    <button
      class="bg-green-500 text-white rounded-lg px-5 py-2 mr-3"
      v-on:click="showUser()"
    >
      ShowUser
    </button>
  </div>
</template>
