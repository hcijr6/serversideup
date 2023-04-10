<template>
  <div
    class="w-full flex flex-col gap-3"
    :class="{ 'opacity-50 pointer-events-none	grayscale': loading }"
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
          class="text-sm font-medium rounded-lg px-3 py-1 cursor-pointer drop-shadow-sm ease-in-out transition-all bg-gray-800 text-white"
        >
          Logout
        </button>
      </div>
    </div>
    <div class="flex justify-between" v-if="tablePagination">
      <div class="flex gap-1 flex-wrap">
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
            class="text-sm font-medium rounded-lg px-3 py-1 cursor-pointer drop-shadow-sm ease-in-out transition-all"
            :class="[
              n == tablePagination.current
                ? 'bg-gray-800 text-white'
                : 'border hover:border-black hover:border',
            ]"
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
      <div class="flex gap-1">
        <Listbox
          v-model="actualRequest.pagination"
          @update:modelValue="changePagination()"
          v-slot="{ open }"
        >
          <Float :offset="5">
            <ListboxButton
              class="text-sm font-medium border rounded-lg px-3 py-1 cursor-pointer drop-shadow-sm hover:border-black hover:border ease-in-out transition-all bg-white"
              :class="{
                'border-black': open,
              }"
            >
              Items: {{ actualRequest.pagination }}
            </ListboxButton>
            <ListboxOptions
              class="bg-white rounded-lg p-1 border flex flex-col gap-1 drop-shadow"
            >
              <ListboxOption
                v-slot="{ active, selected }"
                v-for="item in paginationOptions"
                :value="item"
                :key="item"
                as="template"
              >
                <li
                  :class="[
                    selected
                      ? 'bg-gray-800 text-white'
                      : 'border hover:border-black bg-white',
                    'text-sm font-medium  rounded-lg px-3 py-1 cursor-pointer drop-shadow-sm ease-in-out transition-all ',
                  ]"
                >
                  {{ item }}
                </li>
              </ListboxOption>
            </ListboxOptions>
          </Float>
        </Listbox>
      </div>
    </div>

    <table v-if="tableData">
      <thead>
        <tr>
          <th></th>
          <th
            v-for="(tableHeader, key) in tableHeaders"
            :key="key"
            class="pt-2 text-left font-semibold pr-2"
          >
            <div class="flex justify-between transition-all ease-out items-end">
              <span
                @click="setOrder(key)"
                class="hover:underline cursor-pointer"
                >{{ tableHeader.title }}</span
              >
              <div class="flex flex-col gap-[1px] transition-all ease-out">
                <span
                  class="px-1 border hover:border-gray-800 rounded-t transition-all ease-out drop-shadow-sm cursor-pointer"
                  :class="[
                    actualRequest.order &&
                    tableHeader.field == actualRequest.order.field &&
                    actualRequest.order.direction == 'DESC'
                      ? 'border-gray-800'
                      : '',
                  ]"
                  @click="setOrder(key, 'DESC')"
                >
                  <ChevronUpIcon class="h-3 w-3"></ChevronUpIcon>
                </span>
                <span
                  class="px-1 border hover:border-gray-800 rounded-b transition-all ease-out drop-shadow-sm cursor-pointer"
                  :class="[
                    actualRequest.order &&
                    tableHeader.field == actualRequest.order.field &&
                    actualRequest.order.direction == 'ASC'
                      ? 'border-gray-800'
                      : '',
                  ]"
                  @click="setOrder(key, 'ASC')"
                >
                  <ChevronDownIcon class="h-3 w-3"></ChevronDownIcon>
                </span>
              </div>
            </div>
          </th>
          <th></th>
        </tr>
        <tr>
          <th class="text-left px-2">
            <input type="checkbox" name="" id="" />
          </th>
          <th
            v-for="(tableFilter, index) in actualRequest.filters"
            :key="index"
            class="text-left py-2 pr-2"
          >
            <input
              v-if="tableFilter != false"
              class="text-sm font-medium border rounded-lg px-3 py-1 cursor-pointer drop-shadow-sm hover:border-black hover:border ease-in-out transition-all bg-white w-full"
              type="text"
              v-model="tableFilter.content"
              @keyup.enter="changeFilters()"
            />
            <span
              v-else
              class="text-sm font-medium border rounded-lg px-3 py-1 cursor-pointer hover:border-black hover:border ease-in-out transition-all"
              >Add</span
            >
          </th>
          <th class="text-right">
            <button
              class="text-sm font-medium border rounded-lg px-3 py-1 cursor-pointer drop-shadow-sm hover:border-black hover:border ease-in-out transition-all bg-white"
            >
              Apply
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="border-gray-200 border-b last:border-none rounded-lg"
          v-for="user in tableData"
        >
          <td class="px-2">
            <input type="checkbox" class="" name="" id="" />
          </td>
          <td class="font-semibold py-2 pr-2 text-sm">{{ user.name }}</td>
          <td class="py-2 pr-2 text-sm underline">{{ user.email }}</td>
          <td class="py-2 pr-2 text-sm">{{ user.created_at }}</td>
          <td class="py-2 pr-2 text-sm">{{ user.updated_at }}</td>
          <td class="text-right">
            <button
              class="text-sm font-medium border rounded-lg px-3 py-1 cursor-pointer drop-shadow-sm hover:border-black hover:border ease-in-out transition-all bg-white"
            >
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
import {
  EllipsisHorizontalIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/vue/24/solid";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import { Float } from "@headlessui-float/vue";

export default {
  setup() {
    const authStore = useAuthStore();
    return { authStore };
  },
  components: {
    EllipsisHorizontalIcon,
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
    Float,
    ChevronUpIcon,
    ChevronDownIcon,
  },
  data() {
    return {
      loading: false,
      tableHeaders: [
        {
          title: "Name",
          field: "name",
        },
        {
          title: "Email",
          field: "email",
        },
        {
          title: "Created At",
          field: "created_at",
        },
        {
          title: "Updated At",
          field: "updated_at",
        },
      ],
      tableData: false,
      tablePagination: false,
      paginationOptions: [10, 15, 20, 25, 30],
      actualRequest: {
        page: 1,
        pagination: 15,
        filters: {
          name: {
            field: "name",
            type: "%LIKE%",
            content: "",
          },
          email: false,
          created_at: false,
          updated_at: false,
        },
        order: false,
      },
    };
  },
  methods: {
    changeFilters() {
      this.getData();
    },
    changePage(page) {
      this.actualRequest.page = page;
      this.tablePagination.current = page;
      this.getData();
    },
    changePagination() {
      this.actualRequest.page = 1;
      this.tablePagination.current = 1;
      this.getData();
    },
    setOrder(key, direction = false) {
      console.log(this.tableHeaders[key],direction);
      var defaultDirection = "ASC";
      if (!this.actualRequest.order) {
        this.actualRequest.order = {};
        this.actualRequest.order.field = this.tableHeaders[key].field;
        this.actualRequest.order.direction = defaultDirection;
      } else {
        if (
          this.actualRequest.order.field == this.tableHeaders[key].field &&
          !direction
        ) {
          switch (this.actualRequest.order.direction) {
            case "ASC":
              this.actualRequest.order.direction = "DESC";
              break;
            case "DESC":
              this.actualRequest.order = false;
              break;
            default:
              this.actualRequest.order = false;
              break;
          }
        } else if (
          this.actualRequest.order.field == this.tableHeaders[key].field &&
          direction &&
          direction == this.actualRequest.order.direction
        ) {
          this.actualRequest.order = false;
        } else if (
          this.actualRequest.order.field == this.tableHeaders[key].field &&
          direction &&
          direction != this.actualRequest.order.direction
        ) {
          this.actualRequest.order.direction = direction;
        } else if(this.actualRequest.order.field != this.tableHeaders[key].field){
          this.actualRequest.order.direction = false;
        }
      }
      console.log(this.actualRequest.order);
      this.getData();
    },
    async getData() {
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
      console.log(response);
      this.tableData = response.data;
      if (Array.isArray(this.tableData) && this.tableData.length > 0) {
        this.tablePagination = {
          from: response.meta.from,
          to: response.meta.to,
          current: response.meta.current_page,
          last: response.meta.last_page,
          range: [],
        };
        this.setPagination();
      } else {
        this.tablePagination = false;
      }
    },
    setPagination() {
      var limit = 5;
      if (limit % 2 == 0) {
        var limitHalf = limit / 2;
      } else {
        var limitHalf = (limit - 1) / 2;
      }
      var first = 1;
      if (this.tablePagination.last <= limit) {
        this.tablePagination.range = range(
          first,
          this.tablePagination.last + 1
        );
      } else if (
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
