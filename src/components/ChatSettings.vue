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
      class="flex flex-col mx-4 w-full max-w-2xl bg-[#0D0D0D] p-4 rounded-xl border border-[#404040] shadow-lg"
    >
      <div class="flex justify-between text-[#A2A2A2]">Auto send mic input
        <Toggle @toggled="autoSend"/>
      </div>
    </div>
  </div>
</template>

<script>
import Toggle from "./Toggle.vue";
export default {
  name: "ChatSettings",
  props: {
    active: Boolean,
    toggleCommandBar: Function,
  },
  components: {
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

    autoSend(value) {
      console.log("Auto send", value);
      this.$emit("auto-send", value);
    },
  },
};
</script>

<style></style>
