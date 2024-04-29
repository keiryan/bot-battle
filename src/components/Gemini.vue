<template>
  <ChatBox msg="Hello, I am Gemini!">
    <div class="w-full h-full bg-blue-500">
      This is an example of a child I want to pass.
    </div>
  </ChatBox>
</template>

<script>
import ChatBox from "./ChatBox.vue";
export default {
  name: "Gemini",
  props: {
    msg: String,
  },

  components: {
    ChatBox,
  },
};
</script>
