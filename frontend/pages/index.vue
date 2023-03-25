<script setup>
definePageMeta({
  layout: "app-layout",
  middleware: ["auth"]
});
</script>
<template>
  <div class="p-5 flex items-center justify-center">
    <UsersTable></UsersTable>
  </div>
</template>