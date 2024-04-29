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

<script>
import Tooltip from "./Tooltip.vue";

export default {
  name: "MessageBox",
  props: {
    submitEvent: Function,
  },

  components: {
    Tooltip,
  },

  data() {
    return {
      message: "",
      showTooltip: false,
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
    onSubmit(e) {
      const textarea = this.$el.querySelector("textarea");
      textarea.style.height = "1.5rem"; // Reset height
      e.preventDefault();
      this.submitEvent(this.message);
      this.message = "";
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
    background-color: #4B4B4B; /* Change color on hover */
    cursor: pointer;
}

</style>
