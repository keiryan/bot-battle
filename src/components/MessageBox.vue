<template>
  <form
    @submit="onSubmit"
    class="bg-[#212121] mb-6 w-full flex items-end p-2 rounded-md border border-[#404040] focus:border-[#4B4B4B]"
  >
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="white"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13"
        />
      </svg>
    </div>
    <textarea
      type="text"
      class="flex-1 h-2 bg-[#212121] text-white placeholder-[#4B4B4B] outline-none px-2 resize-none max-h-52 overflow-y-auto custom-scrollbar"
      placeholder="Type a message..."
      v-model="message"
    />

    <div class="mr-2">
      <CircleStop
        v-if="recording"
        class="cursor-pointer"
        color="#fff"
        @click="stopRecording"
      />
      <Mic v-else color="#fff" class="cursor-pointer" @click="startRecording" />
    </div>

    <template>
      <Headphones />
    </template>

    <!-- Submit button -->
    <div
      @click="onSubmit"
      :class="
        message.length > 0 ? 'bg-[#ffffff]' : 'bg-[#4B4B4B] pointer-events-none'
      "
      class="rounded hover:cursor-pointer relative"
      @mouseenter="showTooltip = true"
      @mouseleave="showTooltip = false"
    >
      <Tooltip text="Send" position="top" v-if="showTooltip" />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#212121"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-arrow-up p-0.5"
      >
        <path d="m5 12 7-7 7 7" />
        <path d="M12 19V5" />
      </svg>
    </div>
  </form>
</template>

<script setup>
import { Mic, CircleStop } from "lucide-vue-next";
</script>

<script>
import Tooltip from "./Tooltip.vue";
import { watch } from "vue";

export default {
  name: "MessageBox",
  props: {
    submitEvent: Function,
    autoSendMicInput: Boolean,
  },

  components: {
    Tooltip,
  },

  data() {
    return {
      message: "",
      showTooltip: false,
      recording: false,
      mediaRecorder: null,
      audioChunks: [],
    };
  },

  mounted() {
    const textarea = this.$el.querySelector("textarea");

    const resizeTextarea = () => {
      textarea.style.height = "1.5rem"; // Reset height
      textarea.style.height = textarea.scrollHeight + "px";
    };

    resizeTextarea(); // Initial resize
    textarea.addEventListener("input", resizeTextarea);
    textarea.addEventListener("keydown", this.handleEnterKey);
  },

  methods: {
    async startRecording() {
      this.recording = true;
      this.audioChunks = [];

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(stream);

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.audioChunks.push(event.data);
        }
      };

      this.mediaRecorder.onstop = this.handleRecordingStop;
      this.mediaRecorder.start(1000); // Collect data every second
    },

    async stopRecording() {
      this.recording = false;
      setTimeout(() => this.mediaRecorder.stop(), 500); // Delay stopping by 500ms
    },

    async handleRecordingStop() {
      const audioBlob = new Blob(this.audioChunks, { type: "audio/wav" });
      const formData = new FormData();
      formData.append("file", audioBlob, "audio.wav");
      formData.append("model", "whisper-1");

      try {
        const response = await fetch(
          "https://api.openai.com/v1/audio/transcriptions",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("ChatGPTAPIKey")}`,
            },
            body: formData,
          }
        );

        const result = await response.json();

        if (this.autoSendMicInput) {
          this.submitEvent(result.text);
        } else {
          this.message = result.text;
        }
      } catch (error) {
        console.error("Error sending audio to Whisper API:", error);
      }
    },

    onSubmit(e) {
      if (this.message.length > 0) {
        const textarea = this.$el.querySelector("textarea");
        textarea.style.height = "1.5rem"; // Reset height
        e.preventDefault();
        this.submitEvent(this.message);
        this.message = "";
      }
    },

    handleEnterKey(e) {
      if (e.key === "Enter" && !e.shiftKey) {
        // Check if Enter key is pressed without the Shift key
        e.preventDefault(); // Prevent default Enter key behavior (newline)
        this.onSubmit(e); // Call submitEvent method
      }
    },
  },
};
</script>

<style>
/* Targeting the specific element with a unique class */
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent; /* Makes the track invisible */
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #383838; /* Visible thumb with a specific color */
  border-radius: 10px; /* Rounded corners for the thumb */
}

.custom-scrollbar::-webkit-scrollbar {
  width: 8px; /* Width of the scrollbar, making sure the thumb is visible */
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: #4b4b4b; /* Change color on hover */
  cursor: pointer;
}

.record-button,
.recording-button {
  background-color: #ff4d4d;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 0.5rem;
}

.recording-button {
  background-color: #ff4d4d;
}
</style>
