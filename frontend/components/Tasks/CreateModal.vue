<template>
  <div
    class="w-full flex flex-wrap gap-y-3 gap-x-[2%]"
    :class="{ 'opacity-50 pointer-events-none grayscale': loading }"
  >
    <div class="w-full md:w-[49%] flex flex-col gap-y-1">
      <label class="text-sm" for="">Name</label>
      <input
        v-model="form.name"
        type="text"
        class="text-sm border rounded-lg px-3 py-1 drop-shadow-sm hover:border-black hover:border ease-in-out transition-all bg-white w-full"
      />
      <span v-for="message in validations.name" class="text-red-500 text-xs">{{
        message
      }}</span>
    </div>
    <div class="w-full md:w-[49%] flex flex-col gap-y-1">
      <label class="text-sm" for="">Color</label>
      <input
        v-model="form.color"
        type="text"
        class="text-sm border rounded-lg px-3 py-1 drop-shadow-sm hover:border-black hover:border ease-in-out transition-all bg-white w-full"
      />
      <span v-for="message in validations.color" class="text-red-500 text-xs">{{
        message
      }}</span>
    </div>
    <div class="w-full flex flex-col gap-y-1">
      <label class="text-sm" for="">Description</label>
      <textarea
        v-model="form.description"
        rows="10"
        type="text"
        class="text-sm border rounded-lg p-3 drop-shadow-sm hover:border-black transition-colors hover:border bg-white w-full"
      ></textarea>
      <span
        v-for="message in validations.description"
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
        @click="createTask"
        class="text-sm font-medium rounded-lg px-10 py-3 cursor-pointer drop-shadow-sm ease-in-out transition-all bg-gray-800 text-white"
      >
        Save
      </button>
    </div>
  </div>
</template>
<script>
export default {
  emits: ["toggleCreateModal", "created"],
  data() {
    return {
      loading: false,
      form: {
        name: "taskTest",
        description: "descriptionTest"
      },
      validations: {
        name: [],
        description: [],
        color: [],
      },
    };
  },
  methods: {
    async createTask() {
      var data = this.form;
      this.loading = true;
      var response = await $larafetch("/api/v1/tasks", {
        response: true,
        method: "post",
        body: data,
      });
      this.loading = false;
      this.resetErrors();
      console.log(response);
      if (!response.ok && response._data && response._data.errors) {
        Object.keys(response._data.errors).forEach((key) => {
          this.validations[key] = response._data.errors[key];
        });
      } else {
        this.toggleModal();
        this.$emit("created");
      }
    },
    resetErrors() {
      Object.keys(this.validations).forEach((key) => {
        this.validations[key] = [];
      });
    },
    toggleModal() {
      this.$emit("toggleCreateModal");
    },
  },
};
</script>
