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
import getStats from "../utils/stats";

export default {
  name: "Gemini",
  components: {
    ChatBox,
    ChatGPTMessage,
    MessageBox,
  },

  props: {
    query: String,
  },

  methods: {
    onSubmit(message) {
      this.chatSubmission(message, "user");
      this.callToApi(message);
    },

    chatSubmission(message, user) {
      this.messages.push({
        id: this.messages.length + 1,
        message: message,
        sender: user,
      });
      //   Store in local storage
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

    async callToApi(message) {
      const apiKey = localStorage.getItem("GeminiAPIKey");
      const startTime = performance.now(); // Start timing before request
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        // Remove the last message as it is the user's message and the model automatically duplicates it due to the way the .startChat() method works
        const chat = model.startChat({
          history: [
            ...this.messages
              .map((message) => ({
                role: message.sender === "gemini" ? "model" : "user",
                parts: [{ text: message.message }],
              }))
              .slice(0, -1),
          ],
        });

        const result = await chat.sendMessage(message);
        const response = result.response;
        this.chatSubmission(response.text(), "gemini");
        const endTime = performance.now();
        getStats({
          start: startTime,
          end: endTime,
          message: response.text(),
          assistant: "Gemini",
        });
      } catch (error) {
        console.error(error);
      }
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

  watch: {
    query: {
      handler(newVal) {
        this.onSubmit(newVal);
      },
    },
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
