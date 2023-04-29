<script setup>
definePageMeta({
  layout: "app-layout",
  middleware: ["auth"],
});
</script>
<template>
    <UsersTable></UsersTable>
</template>
<style lang="scss" scoped>

</style>