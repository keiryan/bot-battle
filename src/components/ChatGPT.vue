<template>
  <ChatBox>
    <div class="relative w-full h-full bg-[#212121] flex justify-center px-4">
      <ChatSettings
        :active="settingsActive"
        :toggleCommandBar="toggleSettings"
        @auto-send="autoSend"
        :chatParams="chatParams"
        @close-chat="handleCloseChat"
      />
      <ChatHeader
        :callStats="{ formattedTime, timeTaken, messageLength }"
        initialName="ChatGPT"
        :initialModel="currentModel"
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
import ChatHeader from "./ChatHeader.vue";
import ChatSettings from "./ChatSettings.vue";
import newMessage from "../utils/newMessage";

export default {
  name: "ChatGPT",
  props: {
    query: String,
    chatParams: Object,
  },
  components: {
    ChatBox,
    ChatGPTMessage,
    MessageBox,
    ChatHeader,
    ChatSettings,
  },

  methods: {
    onSubmit(message) {
      this.chatSubmission(message);
      this.callToApi();
    },

    handleCloseChat() {
      this.$emit("chat-closed", this.chatParams);
    },

    autoSend(value) {
      this.autoSendMicInput = value;
    },

    toggleSettings() {
      this.settingsActive = !this.settingsActive;
    },

    chatSubmission(message) {
      this.messages.push(newMessage(message));
      // Store in local storage
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

    async callToApi() {
      const start = performance.now(); // Start timing before request
      const apiKey = localStorage.getItem("ChatGPTAPIKey");
      try {
        const response = await fetch(
          "https://api.openai.com/v1/chat/completions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
              model: this.currentModel,
              messages: [
                ...this.messages.map((message) => ({
                  role: message.sender === "user" ? "user" : "assistant",
                  content: message.message,
                })),
              ],
            }),
          }
        );
        const data = await response.json();
        const end = performance.now(); // End timing after response
        // const { timeTaken, messageLength, formattedTime } = getStats({
        //   start,
        //   end,
        //   assistant: "ChatGPT",
        //   message: data.choices[0].message.content,
        // });

        const latestMessage = newMessage({
          message: data.choices[0].message.content,
          sender: "ai-chatgpt",
          start,
          end,
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
      currentModel: this.chatParams.model ?? "gpt-4o",
      modelLegend: {
        "gpt-4": "gpt-4-turbo",
        "gpt-3": "gpt-3-turbo",
        "gpt-4o": "gpt-4o",
      },
      modelNameLegend: {
        "gpt-4": "Chat GPT-4",
        "gpt-3": "Chat GPT-3",
        "gpt-4o": "Chat GPT-4 Omega",
      },
      timeTaken: 0,
      messageLength: 0,
      formattedTime: "",
      settingsActive: false,
      autoSend(value) {
        this.autoSendMicInput = value;
      },
    };
  },

  watch: {
    query: {
      handler(newVal) {
        this.onSubmit(newMessage({ message: newVal }));
      },
    },
  },
};
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  scrollbar-width: none;
  -ms-overflow-style: none;
  display: none;
}
</style>
