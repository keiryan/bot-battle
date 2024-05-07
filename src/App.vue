<template>
  <div className="w-screen h-screen flex relative">
    <ChatGPT :query="this.query" />
    <!-- Visual divider -->
    <div class="w-2 h-full bg-black" />
    <Gemini :query="this.query" />
    <CommandBar
      :active="commandBarActive"
      :toggleCommandBar="toggleCommandBar"
      @submitQuery="submitQueryToAI"
      @closeCommandBar="toggleCommandBar"
    />
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
    if (!localStorage.getItem("username")) {
      localStorage.setItem("username", "You");
    }
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
    submitQueryToAI(query) {
      // Handle query submission to AI
      this.query = query;
      console.log(query);
    },
  },

  data() {
    return {
      commandBarActive: false,
      query: "",
    };
  },
};
</script>

<style></style>
