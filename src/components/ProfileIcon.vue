<template>
  <ChatGPTIcon v-if="role === 'ai-chatgpt'" />
  <!-- <GeminiIcon v-if="role === 'ai-gemini'" /> -->
  <UserIcon v-if="role === 'user'" />
</template>

<script>
import ChatGPTIcon from "./ChatGPTIcon.vue";
import UserIcon from "./UserIcon.vue";
export default {
  name: "ProfileIcon",
  props: {
    role: String,
  },
  components: {
    ChatGPTIcon,
    UserIcon,
  },
};
</script>

<style></style>
