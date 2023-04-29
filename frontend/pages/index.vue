<script setup>
definePageMeta({
  layout: "app-layout",
  middleware: ["auth"],
});
</script>
<template>
   <h1 class="text-3xl">Home</h1>
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