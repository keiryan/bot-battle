<template>
  <div
    class="message-container flex mb-2"
    :class="message.sender === 'user' && 'mb-8'"
  >
    <!-- Profile Image -->
    <div
      class="border border-[#404040] rounded-full flex items-center justify-center h-6 w-6 mr-2"
      :class="
        message.sender === 'user' ? 'p-0.5 bg-[#001C2B]' : 'p-1 bg-[#212121]'
      "
    >
      <ProfileIcon :role="message.sender" />
    </div>
    <!-- Name and Message -->
    <div class="flex flex-col text-white">
      <div class="font-bold">
        {{ senderLegend[message.sender] }}
      </div>
      <div v-html="renderedMarkdown" />
      <!-- Icon Array -->
      <MessageIconArray :message="message" v-if="message.sender !== 'user'" />
    </div>
  </div>
</template>

<script>
import ChatGPTIcon from "./ChatGPTIcon.vue";
import ProfileIcon from "./ProfileIcon.vue";
import MessageIconArray from "./MessageIconArray.vue";
import { marked } from "marked";

marked.setOptions({
  renderer: new marked.Renderer(),
  pedantic: false,
  gfm: true,
  breaks: false,
  sanitize: false, // Allow HTML but beware of XSS risks
  smartLists: true,
  smartypants: false,
});

export default {
  name: "ChatGPTMessage",
  props: {
    message: Object,
  },

  components: {
    ChatGPTIcon,
    ProfileIcon,
    MessageIconArray,
  },

  computed: {
    renderedMarkdown() {
      return marked(this.message.message);
    },
  },

  data() {
    return {
      senderLegend: {
        user: "You",
        'ai-chatgpt': "ChatGPT",
        gemini: "Gemini",
      },
    };
  },
};
</script>

<style>
.message-container:hover .icons-container {
  opacity: 1;
}
</style>
