<template>
  <ChatBox>
    <div class="w-full h-full bg-[#212121] flex justify-center px-4">
      <!-- Box containing messages -->
      <div class="flex flex-col w-full max-w-3xl py-4">
        <!-- Chat Messages -->
        <div class="w-full h-full overflow-y-auto no-scrollbar">
          <ChatGPTMessage v-for="message in messages" :message="message" />
        </div>
        <div class="w-full">
          <MessageBox :submitEvent="onSubmit" />
        </div>
      </div>
    </div>
  </ChatBox>
</template>

<script>
import ChatBox from "./ChatBox.vue";
import ChatGPTMessage from "./ChatGPTMessage.vue";
import MessageBox from "./MessageBox.vue";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default {
  name: "Gemini",
  components: {
    ChatBox,
    ChatGPTMessage,
    MessageBox,
  },

  methods: {
    onSubmit(message) {
      this.chatSubmission(message, "user");
      this.callToApi();
    },

    chatSubmission(message, user) {
      this.messages.push({
        id: this.messages.length + 1,
        message: message,
        sender: user,
      });
      // Store in local storage
      localStorage.setItem("GeminiMessages", JSON.stringify(this.messages));
      this.scrollToBottom();
    },

    scrollToBottom() {
      this.$nextTick(() => {
        const chatContainer = this.$el.querySelector(".overflow-y-auto");
        const lastMessage = chatContainer.lastElementChild;
        if (lastMessage) {
          lastMessage.scrollIntoView({ behavior: "smooth" });
        }
      });
    },

    // Fetch initial message from Gemini
    async callToApi() {
      const apiKey = localStorage.getItem("GeminiAPIKey");
      const genAI = new GoogleGenerativeAI(apiKey);

      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const prompt = this.messages[this.messages.length - 1].message;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      this.chatSubmission(text, "gemini");
    },
  },

  mounted() {
    this.scrollToBottom();
  },

  data() {
    return {
      messages: JSON.parse(localStorage.getItem("GeminiMessages")) || [],
    };
  },
};
</script>

<style>
.no-scrollbar::-webkit-scrollbar {
  scrollbar-width: none;
  -ms-overflow-style: none;
  display: none;
}
</style>
