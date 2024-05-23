<template>
  <ChatBox>
    <div class="relative w-full h-full bg-[#212121] flex justify-center px-4">
      <ChatSettings
        :active="settingsActive"
        :toggleCommandBar="toggleSettings"
        @auto-send="autoSend"
        @chatParams="chatParams"
        @close-chat="handleCloseChat"
      />
      <ChatHeader
        initialName="Gemini"
        :callStats="{ formattedTime, timeTaken, messageLength }"
        initialModel="Gemini Pro"
        @toggleSettings="toggleSettings"
      />
      <!-- Box containing messages -->
      <div class="flex flex-col w-full max-w-3xl py-4">
        <!-- Chat Messages -->
        <div class="w-full h-full overflow-y-auto no-scrollbar pt-16">
          <ChatGPTMessage v-for="message in messages" :message="message" />
        </div>
        <div class="w-full">
          <MessageBox
            @chat-submission="onSubmit"
            :autoSendMicInput="autoSendMicInput"
          />
        </div>
      </div>
    </div>
  </ChatBox>
</template>

<script>
import ChatBox from "./ChatBox.vue";
import ChatGPTMessage from "./Message.vue";
import MessageBox from "./MessageBox.vue";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ChatHeader from "./ChatHeader.vue";
import ChatSettings from "./ChatSettings.vue";
import newMessage from "../utils/newMessage";

export default {
  name: "Gemini",
  components: {
    ChatBox,
    ChatGPTMessage,
    MessageBox,
    ChatHeader,
    ChatSettings,
  },

  props: {
    query: String,
    chatParams: Object,
  },

  methods: {
    onSubmit(message) {
      if (this.messages?.at(-1)?.sender === "user") {
        console.log("User has already sent a message");
      } else {
        this.chatSubmission(message);
      }
      this.callToApi(message.message);
    },

    autoSend(value) {
      this.autoSendMicInput = value;
    },

    toggleSettings() {
      this.settingsActive = !this.settingsActive;
    },

    handleCloseChat() {
      this.$emit("chat-closed", this.chatParams);
    },

    chatSubmission(message) {
      console.log("chatSubmission", message);
      this.messages.push(newMessage({ ...message }));
      //   Store in local storage
      localStorage.setItem(this.chatParams.id, JSON.stringify(this.messages));
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
        const model = genAI.getGenerativeModel({
          model: this.chatParams.model,
        });

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
        const endTime = performance.now();
        // const { timeTaken, messageLength, formattedTime } = getStats({
        //   start: startTime,
        //   end: endTime,
        //   message: response.text(),
        //   assistant: "Gemini",
        // });
        const timeTaken = endTime - startTime;
        console.log("Time taken:", timeTaken);
        const latestMessage = newMessage({
          message: response.text(),
          sender: "gemini",
          start: startTime,
          end: endTime,
        });

        this.chatSubmission(latestMessage);

        this.timeTaken = latestMessage.timeTaken;
        this.messageLength = latestMessage.messageLength;
        this.formattedTime = latestMessage.formattedTime;
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
      messages: JSON.parse(localStorage.getItem(`${this.chatParams.id}`)) || [],
      timeTaken: 0,
      messageLength: 0,
      formattedTime: "",
      settingsActive: false,
      autoSendMicInput: false,
    };
  },

  watch: {
    query: {
      handler(newVal) {
        this.onSubmit({ message: newVal });
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
