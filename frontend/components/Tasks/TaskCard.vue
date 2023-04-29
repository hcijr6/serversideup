<template>
  <div
    class="border p-3 rounded-lg flex flex-col justify-between gap-3 hover:border-black"
  >
    <div class="flex flex-col gap-2">
      <span class="text-xl">{{ task.name }}</span>
      <span class="text-sm">{{ task.description }}</span>
    </div>
    <div class="flex justify-between gap-1">
      
      <div class="flex justify-center gap-1">
        <button
        class="text-sm font-medium rounded-lg px-3 py-1 cursor-pointer drop-shadow-sm ease-in-out transition-all bg-gray-800 text-white"
        @click="$emit('updateTask')"
      >
        Edit
      </button>
      <button
        class="text-sm font-medium rounded-lg px-3 py-1 cursor-pointer drop-shadow-sm ease-in-out transition-all bg-red-800 text-white"
        @click="$emit('deleteTask')"
      >
        Delete
      </button>
      </div>
      <div>
        <input type="checkbox" id="checkbox" class="accent-black h-5 w-5" v-model="task.checked" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["task"],
  emits: ["deleteTask", "updateTask"],
};
</script>
