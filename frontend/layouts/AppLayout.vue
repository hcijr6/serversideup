<template>
  <div class="px-5 flex gap-3 w-screen h-screen overflow-hidden transition-all ease-out" id="app-layout">
    <div class="py-5 transition-all md:min-w-[3.7rem] hidden md:block">
      <GlobalAdminNavigation></GlobalAdminNavigation>
    </div>
    <div class="w-full overflow-auto py-5">
      <div class="w-full p-5 drop-shadow-sm  border rounded-lg min-h-full">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script setup></script>