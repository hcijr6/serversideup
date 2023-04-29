<template>
  <div
    class="w-full flex flex-col gap-3"
    :class="{ 'opacity-50 pointer-events-none grayscale': loading }"
  >
    <div class="flex justify-between gap-1">
      <h1 v-if="!loading" class="text-2xl font-semibold">Tasks</h1>
      <h1 v-else class="text-2xl font-semibold">Loading</h1>
      <div>
        <button
          class="text-sm font-medium rounded-lg px-3 py-1 cursor-pointer drop-shadow-sm ease-in-out transition-all bg-gray-800 text-white"
          @click="createModalOpen = !createModalOpen"
        >
          Add
        </button>
        <PrimitivesModal
          title="Add Task"
          :isOpen="createModalOpen"
          @toggleModal="createModalOpen = !createModalOpen"
        >
          <TasksCreateModal
            @created="getTasks()"
            @toggleCreateModal="createModalOpen = !createModalOpen"
          ></TasksCreateModal>
        </PrimitivesModal>
      </div>
      <PrimitivesModal
        title="Edit Task"
        :isOpen="updateModalOpen"
        @toggleModal="updateModalOpen = !updateModalOpen"
      >
        <TasksUpdateModal
          :task="editableTask"
          @updated="getTasks()"
          @toggleModal="updateModalOpen = !updateModalOpen"
        ></TasksUpdateModal>
      </PrimitivesModal>
    </div>
    <div
      class="w-full grid grid-cols-[repeat(auto-fill,minmax(15em,1fr))] gap-3"
    >
      <TasksTaskCard
        v-for="task in taskStore.tasks"
        :task="task"
        :key="task.id"
        @delete-task="deleteTask(task.id)"
        @update-task="editTask(task.id)"
      ></TasksTaskCard>
    </div>
  </div>
  <div class="fixed right-5 bottom-5 flex gap-2 flex-col-reverse">
    <div
      v-for="nonFormError in taskStore.nonFormErrors"
      class="p-5 rounded-lg cursor-pointer drop-shadow-sm ease-in-out transition-all bg-white border gap-2 flex items-baseline"
    >
      <span class="font-medium">{{ nonFormError.status }}</span>
      <span class="text-sm">{{ nonFormError.message }}</span>
    </div>
  </div>
</template>

<script>
import { useTasks } from "~~/stores/task";

export default {
  setup() {
    definePageMeta({
      mode: "spa",
      layout: "app-layout",
      middleware: ["auth"],
    });
    const taskStore = useTasks();
    return { taskStore };
  },
  data() {
    return {
      loading: false,
      createModalOpen: false,
      updateModalOpen: false,
      editableTask: false,
      tasks: [],
      page: 1,
    };
  },
  methods: {
    async editTask(taskId) {
      this.editableTask = await this.taskStore.getTaskById(taskId);
      this.updateModalOpen = true;
    },
    async deleteTask(taskId) {
      await this.taskStore.deleteTask(taskId);
    },
    async getTasks() {
      await this.taskStore.fetchTasks();
    },
  },
  created() {
    this.taskStore.fetchTasks();
  },
};
</script>
