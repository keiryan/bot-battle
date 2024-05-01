<template>
  <div className="w-screen h-screen flex bg-red-500 relative">
    <ChatGPT />
    <Gemini />
    <CommandBar :active="commandBarActive" :toggleCommandBar="toggleCommandBar" />
  </div>
</template>

<script>
import ChatGPT from "./components/ChatGPT.vue";
import Gemini from "./components/Gemini.vue";
import CommandBar from "./components/CommandBar.vue";

export default {
  name: "App",
  components: {
    ChatGPT,
    Gemini,
    CommandBar,
  },

  mounted() {
    window.addEventListener("keydown", this.handleKeyDown);
  },

  beforeDestroy() {
    window.removeEventListener("keydown", this.handleKeyDown);
  },

  methods: {
    handleKeyDown(event) {
      if (event.ctrlKey && event.key === " ") {
        // ' ' for Spacebar
        event.preventDefault();
        this.toggleCommandBar();
      }
    },
    toggleCommandBar() {
      console.log("Feature activated!");
      // Here you would put whatever you want to happen when Ctrl+Space is pressed
      this.commandBarActive = !this.commandBarActive;
    },
  },

  data() {
    return {
      commandBarActive: false,
    };
  },
};
</script>

<style></style>
