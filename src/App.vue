<template>
  <div className="w-screen h-screen flex relative">
    <ChatGPT />
    <!-- Visual divider -->
    <div class="w-2 h-full bg-black" />
    <Gemini />
    <CommandBar :active="commandBarActive" :toggleCommandBar="toggleCommandBar" />
  </div>
</template>

<script>
import ChatGPT from "./components/ChatGPT.vue";
import CommandBar from "./components/CommandBar.vue";
import Gemini from "./components/Gemini.vue";

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
      if (event.metaKey && event.key === "k") {
        // Command + K

        event.preventDefault();
        this.toggleCommandBar();
      }
    },
    toggleCommandBar() {
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
