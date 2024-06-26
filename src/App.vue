<template>
  <div class="w-screen h-screen flex overflow-hidden">
    <template v-for="(chat, index) in allChats" :key="chat.id">
      <component
        :is="chat.type === 'gemini' ? 'Gemini' : 'ChatGPT'"
        :query="query"
        :chatParams="chat"
        @chat-closed="handleChatClosed"
      />
      <!-- Visual divider -->
      <div
        v-if="index < allChats.length - 1"
        class="w-1.5 h-full bg-black"
      />
    </template>

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

    handleChatClosed(passedChat) {
      // TODO: Find a more robust way to handle chat closing
      if (passedChat.type === "gemini") {
        this.geminiChats = this.geminiChats.filter(
          (chat) => chat.id !== passedChat.id
        );
      } else if (passedChat.type === "gpt") {
        this.gptChats = this.gptChats.filter((chat) => chat.id !== passedChat.id);
      }

      this.totalChats = this.geminiChats.length + this.gptChats.length;
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

      this.totalChats = this.geminiChats.length + this.gptChats.length;
    },
  },

  computed: {
    allChats() {
      return [...this.geminiChats, ...this.gptChats];
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

<style scoped>
/* Add any specific styles here if needed */
</style>