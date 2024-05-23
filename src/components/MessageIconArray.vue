<template>
  <!-- Icons Container -->
  <div
    class="flex gap-1 icons-container transition-all duration-300 ease-in-out mt-2"
  >
    <MessageIconAction
      action="read"
      v-if="message.sender !== 'user'"
      :data="message"
      @click="handleAudioFetch(message.message)"
    />
    <MessageIconAction action="copy" :data="message" />

    <!-- Rename prop from message to data -->
    <MessageIconAction action="info" :data="message" />
  </div>
</template>

<script>
import axios from "axios";
import MessageIconAction from "./MessageIconAction.vue";
import { ref } from "vue";

export default {
  name: "MessageIconArray",
  props: {
    message: Object,
  },
  components: {
    MessageIconAction,
  },

  setup(props) {
    const audioPlayer = ref(null);

    const handleAudioFetch = async (text) => {
      const API_KEY = localStorage.getItem("ElevenLabsAPIKey") || "";
      const VOICE_ID =
        localStorage.getItem(
          `${
            props.message.sender === "gemini" ? "GeminiVoice" : "ChatGPTVoice"
          }`
        ) || ""; // The voice ID you're using

      const options = {
        method: "POST",
        url: `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
        headers: {
          accept: "audio/mpeg",
          "content-type": "application/json",
          "xi-api-key": API_KEY,
        },
        data: { text },
        responseType: "arraybuffer",
      };

      try {
        const response = await axios.request(options);
        const blob = new Blob([response.data], { type: "audio/mpeg" });
        const url = URL.createObjectURL(blob);
        if (audioPlayer.value) {
          audioPlayer.value.src = url;
          audioPlayer.value.play();
        } else {
          audioPlayer.value = new Audio(url);
          audioPlayer.value.play();
        }
      } catch (error) {
        console.error("Error fetching and playing audio:", error);
      }
    };

    return { handleAudioFetch };
  },
};
</script>

<style></style>
