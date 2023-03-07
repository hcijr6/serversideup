<template>
  <!-- <button @click="add" class="bg-black px-3 text-white">
        Add
    </button>
    <button @click="show" class="bg-black px-3 text-white">
        Show
    </button> -->
  <!-- <div v-if="this.taskStore.tasks">
    
  </div> -->
  <div
    class="min-w-[80%] border border-black p-4 rounded-lg flex flex-col gap-5"
  >
    <div class="flex justify-between gap-3">
      <h1 class=" text-2xl font-semibold">Users</h1>
      <button @click="getData" class="bg-black text-white px-3 py-1 rounded-lg">
        Add
      </button>
    </div>
    <table v-if="actualUserData">
      <thead>
        <tr>
          <th class="py-2 text-left font-semibold">Name</th>
          <th class="py-2 text-left font-semibold">Email</th>
          <th class="py-2 text-left font-semibold">Created</th>
          <th class="py-2 text-left font-semibold"></th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-gray-200 border-t" v-for="user in actualUserData">
          <td class=" font-semibold py-2 text-sm">{{ user.name }}</td>
          <td class="py-2 text-sm underline">{{ user.email }}</td>
          <td class="py-2 text-sm">{{ user.created_at }}</td>
          <td class="">
            <button class="px-3 py-1 bg-black text-white rounded-lg">Edit</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      actualUserData: "",
    };
  },
  methods: {
    show() {},
    async getData() {
      const response = await $larafetch("/api/v1/user/getTable", {
        response: true,
        method: "post",
      });
      const result = JSON.parse(response);
      console.log(result.data);
      this.actualUserData = result.data;
    },
  },
  created() {
    this.getData();
  },
};
</script>
