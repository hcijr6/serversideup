<script setup>
definePageMeta({
  layout: "app-layout",
  middleware: ["auth"],
});
</script>
<template>
  <div class="px-5 flex gap-3 w-screen h-screen overflow-hidden transition-all ease-out">
    <div class="py-5 transition-all">
      <GlobalAdminNavigation></GlobalAdminNavigation>
    </div>
    <div class="w-full overflow-auto py-5">
      <div class="w-full p-5 drop-shadow-sm  border rounded-lg">
        <UsersTable></UsersTable>
      </div>
    </div>
  </div>
</template>
<style>
::-webkit-scrollbar {
    width: 0px;
    height: 10px;
    border-radius: 50px;

}

::-webkit-scrollbar-button {
    width: 0px;
    height: 0px;
    border-radius: 50px;

}

::-webkit-scrollbar-thumb {
    background: rgb(31 41 55 / 1);
    border: 0px solid #ffffff;
    border-radius: 50px;
    
}

::-webkit-scrollbar-thumb:hover {
    background: rgb(31 41 55 / 1);
}

::-webkit-scrollbar-thumb:active {
    background: #000000;
}

::-webkit-scrollbar-track {
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
    background: #ffffff;
    border: 0px none #ffffff;
    border-radius: 50px;
    filter:drop-shadow(0 1px 1px rgb(0 0 0 / 0.05));
}

::-webkit-scrollbar-track:hover {
    border: 1px solid gray;
}

::-webkit-scrollbar-corner {
    background: transparent;
}

</style>