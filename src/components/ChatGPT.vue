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
// import OpenAI from "openai";

export default {
  name: "ChatGPT",
  props: {
    msg: String,
  },
  components: {
    ChatBox,
    ChatGPTMessage,
    MessageBox,
  },

  methods: {
    onSubmit(message) {
      console.log("Message submitted: ", message);
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
      localStorage.setItem("chatGPTMessages", JSON.stringify(this.messages));
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

    // Fetch initial message from ChatGPT
    async callToApi() {
      //   const apiKey = localStorage.getItem("chatGPTApiKey");
      const apiKey = "sk-proj-ctWn8aQDt4QAvzu6qE0AT3BlbkFJ0znWnB0I3VJzve8Qgjxn";
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4-turbo",
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
      this.chatSubmission(data.choices[0].message.content, "ai-chatgpt");
    },
  },

  mounted() {
    this.scrollToBottom();
  },

  data() {
    return {
      messages: JSON.parse(localStorage.getItem("chatGPTMessages")) || [],
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
