<script setup>
definePageMeta({
  layout: "app-layout",
  middleware: ["auth"]
});
</script>
<template>
  <div class="w-screen h-screen flex items-center justify-center">
    <UsersTable></UsersTable>
  </div>
</template>