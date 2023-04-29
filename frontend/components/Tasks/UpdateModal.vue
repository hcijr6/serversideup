<template>
  <div
    class="w-full flex flex-wrap gap-y-3 gap-x-[2%]"
    :class="{ 'opacity-50 pointer-events-none grayscale': loading }"
  >
    <div class="w-full md:w-[49%] flex flex-col gap-y-1">
      <label class="text-sm" for="">Name</label>
      <input
        v-model="task.name"
        type="text"
        class="text-sm border rounded-lg px-3 py-1 drop-shadow-sm hover:border-black hover:border ease-in-out transition-all bg-white w-full"
      />
      <span
        v-for="message in taskStore.formErrors.name"
        class="text-red-500 text-xs"
        >{{ message }}</span
      >
    </div>
    <div class="w-full md:w-[49%] flex flex-col gap-y-1">
      <label class="text-sm" for="">Color</label>
      <input
        v-model="task.color"
        type="text"
        class="text-sm border rounded-lg px-3 py-1 drop-shadow-sm hover:border-black hover:border ease-in-out transition-all bg-white w-full"
      />
      <span
        v-for="message in taskStore.formErrors.color"
        class="text-red-500 text-xs"
        >{{ message }}</span
      >
    </div>
    <div class="w-full flex flex-col gap-y-1">
      <label class="text-sm" for="">Description</label>
      <textarea
        v-model="task.description"
        rows="10"
        type="text"
        class="text-sm border rounded-lg p-3 drop-shadow-sm hover:border-black transition-colors hover:border bg-white w-full"
      ></textarea>
      <span
        v-for="message in taskStore.formErrors.description"
        class="text-red-500 text-xs"
        >{{ message }}</span
      >
    </div>
  </div>
  <div class="flex w-full justify-end">
    <div class="flex gap-2">
      <button
        @click="toggleModal()"
        class="text-sm font-medium rounded-lg px-10 py-3 cursor-pointer drop-shadow-sm ease-in-out hover:border-black transition-colors hover:border border bg-white"
      >
        Close
      </button>
      <button
        @click="updateTask"
        class="text-sm font-medium rounded-lg px-10 py-3 cursor-pointer drop-shadow-sm ease-in-out transition-all bg-gray-800 text-white"
      >
        Save
      </button>
    </div>
  </div>
</template>
<script>
import { useTasks } from "~~/stores/task";

export default {
  setup() {
    const taskStore = useTasks();
    return { taskStore };
  },
  props: ["task"],
  emits: ["toggleModal", "updated"],

  data() {
    return {
      loading: false,
    };
  },
  methods: {
    async updateTask() {
      this.resetErrors();
      if(await this.taskStore.updateTask(this.task,false)){
        this.$emit("updated");
        this.$emit("toggleModal");
      }
    },
    resetErrors() {
      this.taskStore.resetFormErrors();
    },
    toggleModal() {
      this.resetErrors();
      this.$emit("toggleModal");
    },
  },
};
</script>
