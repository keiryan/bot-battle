<template>
  <div className="w-screen h-screen flex overflow-hidden">
    <ChatGPT :query="this.query" v-for="chat in gptChats" :chatParams="chat" />
    <!-- Visual divider -->
    <!-- <div class="w-2 h-full bg-black" /> -->
    <Gemini
      :query="this.query"
      v-for="chat in geminiChats"
      :chatParams="chat"
    />

    <NewChat @addChat="addChat" :totalChats="totalChats" />

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
import NewChat from "./components/NewChat.vue";

export default {
  name: "App",
  components: {
    ChatGPT,
    Gemini,
    CommandBar,
    NewChat,
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
    },
    addChat(params) {
      // Add a new chat
      const chat = {
        id: Math.random().toString(36).substring(7),
        ...params,
      };

      if (chat.type === "gemini") {
        this.geminiChats.push(chat);
      } else if (chat.type === "gpt") {
        this.gptChats.push(chat);
      }

      this.totalChats += 1;
    },
  },

  data() {
    return {
      commandBarActive: false,
      query: "",
      geminiChats: [],
      gptChats: [],
      totalChats: 0,
    };
  },
};
</script>

<style scoped></style>
