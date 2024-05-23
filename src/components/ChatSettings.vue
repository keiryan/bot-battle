<template>
  <div
    class="absolute w-full h-full bg-[#000000AB] text-white flex items-center justify-center transition-opacity duration-300 ease-in-out z-[9999]"
    :class="
      active
        ? 'opacity-100 backdrop-blur-sm'
        : 'opacity-0 pointer-events-none backdrop-blur-0'
    "
    @click="handleClick($event)"
  >
    <div
      class="flex flex-col gap-4 mx-4 w-full max-w-2xl bg-[#0D0D0D] p-4 rounded-xl border border-[#404040] shadow-lg"
    >
      <div class="flex w-full justify-between pb-2">
        <h1 class="text-xl text-[#DFDD00]">Chat Settings</h1>
        <CircleX
          class="cursor-pointer transition-all duration-150 ease-in-out hover:stroke-red-500"
          @click="toggleCommandBar"
          size="20"
        />
      </div>
      <div class="flex justify-between text-[#A2A2A2]">
        Auto send mic input
        <Toggle @toggled="autoSend" />
      </div>

      <!-- <CommandBarListInput
        text="Username"
        type="text"
        keyName="username"
        default="You"
      /> -->

      <div class="w-full flex justify-center" @click="closeChat">
        <div
          class="transition-all duration-300 ease-in-out flex items-center gap-2 bg-red-400 p-1 rounded cursor-pointer hover:bg-red-500 p-2 mt-4 justify-center"
        >
          Close Chat <LogOut size="20"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { CircleX, LogOut } from "lucide-vue-next";
</script>

<script>
import Toggle from "./Toggle.vue";
import CommandBarListInput from "./CommandBarListInput.vue";
export default {
  name: "ChatSettings",
  props: {
    active: Boolean,
    toggleCommandBar: Function,
    chatParams: Object,
  },
  components: {
    CommandBarListInput,
    Toggle,
  },
  methods: {
    handleClick(event) {
      // Only toggle if the event was triggered on this div and not a child.
      // This prevents the command bar from closing when clicking inside it.
      if (event.target === event.currentTarget) {
        this.toggleCommandBar();
      }
    },

    closeChat() {
      this.$emit("close-chat");
    },

    autoSend(value) {
      this.$emit("auto-send", value);
    },
  },
};
</script>

<style></style>
