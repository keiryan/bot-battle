<template>
  <ChatGPTIcon v-if="role === 'ai-chatgpt'" />
  <GeminiIcon v-if="role === 'gemini'" />
  <UserIcon v-if="role === 'user'" />
</template>

<script>
import ChatGPTIcon from "./ChatGPTIcon.vue";
import GeminiIcon from "./GeminiIcon.vue";
import UserIcon from "./UserIcon.vue";
export default {
  name: "ProfileIcon",
  props: {
    role: String,
  },

  mounted() {
    console.log(this.role);
  },
  components: {
    ChatGPTIcon,
    GeminiIcon,
    UserIcon,
  },
};
</script>

<style></style>
