<template>
  <div
    class="border border p-4 rounded-lg flex flex-col gap-5"
    :class="{ ' opacity-50	pointer-events-none	grayscale': loading }"
  >
    <div class="flex justify-between gap-1">
      <h1 v-if="!loading" class="text-2xl font-semibold">Users</h1>
      <h1 v-else class="text-2xl font-semibold">Loading</h1>

      <div class="flex gap-1">
        <button
          @click="getData"
          class="text-sm font-medium border rounded-lg px-3 py-1 cursor-pointer drop-shadow-sm hover:border-black hover:border ease-in-out transition-all bg-white"
        >
          Add
        </button>
        <button
          @click="logout"
          class="text-sm font-medium border rounded-lg px-3 py-1 cursor-pointer drop-shadow-sm hover:border-black hover:border ease-in-out transition-all bg-white"
        >
          Logout
        </button>
      </div>
    </div>
    <div class="flex justify-between">
      <div class="flex gap-2 flex-wrap">
        <button
          class="text-sm font-medium border rounded-lg px-3 py-1 cursor-pointer drop-shadow-sm hover:border-black hover:border ease-in-out transition-all bg-white"
          @click="changePage(1)"
          v-if="tablePagination.current > 1"
        >
          First
        </button>
        <template v-for="n in tablePagination.range">
          <button
            @click="changePage(n)"
            class="text-sm font-medium border rounded-lg px-3 py-1 cursor-pointer drop-shadow-sm hover:border-black hover:border ease-in-out transition-all "
            :class="{
              'border-black border': n == tablePagination.current,
            }"
          >
            {{ n }}
          </button>
        </template>
        <button
          class="text-sm font-medium border rounded-lg px-3 py-1 cursor-pointer drop-shadow-sm hover:border-black hover:border ease-in-out transition-all bg-white"
          @click="changePage(tablePagination.last)"
          v-if="tablePagination.current < tablePagination.last"
        >
          Last
        </button>
      </div>
      <div>
        <select v-model="actualRequest.pagination" @change="changePagination" name="" id="" class="text-sm font-medium border rounded-lg px-3 py-1 cursor-pointer drop-shadow-sm hover:border-black hover:border ease-in-out transition-all bg-white">
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
            
          </th>
        </tr>
        <tr>
          <th class="text-left px-2">
            <input type="checkbox" name="" id="" />
          </th>
          <th v-for="tableFilter in tableFilters" class="text-left py-2 pr-2">
              <input v-if="tableFilter != false" class="text-sm font-medium border rounded-lg px-3 py-1 cursor-pointer drop-shadow-sm hover:border-black hover:border ease-in-out transition-all bg-white" type="text" />
              <span v-else class="text-sm font-medium border rounded-lg px-3 py-1 cursor-pointer hover:border-black hover:border ease-in-out transition-all">Add</span>
          </th>
          <th class="text-right">
            <button
              class=" text-sm font-medium border rounded-lg px-3 py-1 cursor-pointer drop-shadow-sm hover:border-black hover:border ease-in-out transition-all bg-white"
            >
              Apply
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-gray-200 border-b last:border-none rounded-lg" v-for="user in tableData">
          <td class="px-2">
            <input type="checkbox" class="" name="" id="" />
          </td>
          <td class="font-semibold py-2 pr-2 text-sm">{{ user.name }}</td>
          <td class="py-2 pr-2 text-sm underline">{{ user.email }}</td>
          <td class="py-2 pr-2 text-sm">{{ user.created_at }}</td>
          <td class="py-2 pr-2 text-sm">{{ user.updated_at }}</td>
          <td class="text-right">
            <button class="text-sm font-medium border rounded-lg px-3 py-1 cursor-pointer drop-shadow-sm hover:border-black hover:border ease-in-out transition-all bg-white">
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
      tableFilters: {
        name : {
          type:'LIKE',
          content: false
        },
        email: false,
        created_at:false,
        updated_at:false
      },
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
      this.actualRequest.page = 1;
      this.tablePagination.current = 1;
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
