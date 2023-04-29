<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @click="toggleModal()" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-end md:p-5 p-2 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="flex flex-col gap-5 w-full max-w-2xl transform overflow-hidden rounded-lg border bg-white p-6 text-left align-middle shadow-xl transition-all md:h-[calc(100vh-2.5em)] h-[calc(100vh-1em)]"
            >
              <div class="flex justify-between">
                <DialogTitle class="text-xl font-semibold">{{
                  title
                }}</DialogTitle>
                <div>
                  <button
                    @click="toggleModal()"
                    class="text-sm font-medium rounded-lg px-3 py-1 cursor-pointer drop-shadow-sm ease-in-out transition-all bg-gray-800 text-white"
                  >
                    Close
                  </button>
                </div>
              </div>
              <div class="w-full h-full flex flex-col justify-between">
                <slot />
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
<script>
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";

export default {
  props: ["title", "isOpen"],
  emits: ["toggleModal"],
  setup() {},
  components: {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
  },
  data() {
    return {
      
    };
  },
  methods: {
    toggleModal() {
      this.$emit("toggleModal");
    },
  },
};
</script>
