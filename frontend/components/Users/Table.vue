<template>
  <div
    class="border border-black p-4 rounded-lg flex flex-col gap-5"
    :class="{ ' opacity-50	pointer-events-none	grayscale': loading }"
  >
    <div class="flex justify-between gap-1">
      <h1 v-if="!loading" class="text-2xl font-semibold">Users</h1>
      <h1 v-else class="text-2xl font-semibold">Loading</h1>

      <div class="flex gap-1">
        <button
          @click="getData"
          class="bg-black text-white px-3 py-1 rounded-lg"
        >
          Add
        </button>
        <button
          @click="logout"
          class="bg-red-500 text-white px-3 py-1 rounded-lg"
        >
          Logout
        </button>
      </div>
    </div>
    <div class="flex justify-between">
      <div class="flex gap-2 flex-wrap">
        <button
          class="rounded-lg border px-3 py-1 border-black hover:bg-black hover:text-white transition-all ease-out"
          @click="changePage(1)"
          v-if="tablePagination.current > 1"
        >
          First
        </button>
        <template v-for="n in tablePagination.range">
          <button
            @click="changePage(n)"
            class="rounded-lg border px-3 py-1 border-black hover:bg-black hover:text-white transition-all ease-out"
            :class="{
              'bg-black text-white': n == tablePagination.current,
            }"
          >
            {{ n }}
          </button>
        </template>
        <button
          class="rounded-lg border px-3 py-1 border-black hover:bg-black hover:text-white transition-all ease-out"
          @click="changePage(tablePagination.last)"
          v-if="tablePagination.current < tablePagination.last"
        >
          Last
        </button>
      </div>
      <div>
        <select v-model="actualRequest.pagination" @change="changePagination" name="" id="" class="rounded-lg border px-3 py-1 cursor-pointer border-black transition-all ease-out">
          <option value="15">15</option>
          <option value="25">25</option>
          <option value="35">35</option>
          <option value="50">50</option>
        </select>
      </div>
    </div>

    <table v-if="tableData">
      <thead>
        <tr>
          <th></th>
          <th
            v-for="tableHeader in tableHeaders"
            class="pt-2 text-left font-semibold"
          >
            {{ tableHeader }}
          </th>
          <th>
            <button
              class="rounded-lg border px-3 py-1 border-black hover:bg-black hover:text-white transition-all ease-out"
            >
              <EllipsisHorizontalIcon class="h-6 w-6" />
            </button>
          </th>
        </tr>
        <tr>
          <th class="text-left px-2">
            <input type="checkbox" name="" id="" />
          </th>
          <th class="text-left py-2 pr-2">
            <input class="border rounded w-full" type="text" />
          </th>
          <th class="text-left py-2 pr-2">
            <input class="border rounded w-full" type="text" />
          </th>
          <th class="text-left py-2 pr-2">
            <input class="border rounded w-full" type="text" />
          </th>
          <th class="text-left py-2 pr-2">
            <input class="border rounded w-full" type="text" />
          </th>
          <th class="text-right">
            <button
              class="px-3 py-1 bg-blue-500 font-normal text-white rounded-lg "
            >
              Apply
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-gray-200 border-t" v-for="user in tableData">
          <td class="px-2">
            <input type="checkbox" class="" name="" id="" />
          </td>
          <td class="font-semibold py-2 pr-2 text-sm">{{ user.name }}</td>
          <td class="py-2 pr-2 text-sm underline">{{ user.email }}</td>
          <td class="py-2 pr-2 text-sm">{{ user.created_at }}</td>
          <td class="py-2 pr-2 text-sm">{{ user.updated_at }}</td>
          <td class="text-right">
            <button class="px-3 py-1 bg-black text-white text-right rounded-lg">
              Edit
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { useAuthStore } from "~~/stores/auth";
import { EllipsisHorizontalIcon } from "@heroicons/vue/24/solid";

export default {
  setup() {
    const authStore = useAuthStore();
    return { authStore };
  },
  components: {
    EllipsisHorizontalIcon,
  },
  data() {
    return {
      loading: false,
      tableFilters: false,
      tableHeaders: ["Name", "Email", "Created At", "Updated At"],
      tableData: false,
      tablePagination: false,
      actualRequest: {
        page: 1,
        pagination:15
      },
    };
  },
  methods: {
    changePage(page) {
      this.actualRequest.page = page;
      this.tablePagination.current = page;
      // this.setPagination();
      this.getData(true);
    },
    changePagination(){
      this.getData();
    },
    async getData(refresh = false) {
      const { data, pending } = await useAsyncData("data", () =>
        $larafetch(`/api/v1/user/getTable`, {
          response: true,
          method: "post",
          body: this.actualRequest,
          params: {
            page: this.actualRequest.page,
          },
        })
      );
      this.loading = pending;
      var response = data.value;

      this.tableData = response.data;
      this.tablePagination = {
        from: response.meta.from,
        to: response.meta.to,
        current: response.meta.current_page,
        last: response.meta.last_page,
        range: [],
      };
      this.setPagination();
    },
    setPagination() {
      var limit = 5;
      if (limit % 2 == 0) {
        var limitHalf = limit / 2;
      } else {
        var limitHalf = (limit - 1) / 2;
      }
      var first = 1;
      if (
        this.tablePagination.current + (limit - 1) >
        this.tablePagination.last
      ) {
        console.log(this.tablePagination.current, this.tablePagination.last);
        this.tablePagination.range = range(
          this.tablePagination.last - (limit - 1),
          this.tablePagination.last + 1
        );
      } else if (this.tablePagination.current > limit - limitHalf) {
        first = this.tablePagination.current - limitHalf;
        this.tablePagination.range = range(first, first + limit);
      } else {
        this.tablePagination.range = range(first, first + limit);
      }
    },
  },
  created() {
    this.getData();
  },
};
</script>
