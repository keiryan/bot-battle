<template>
  <div
    class="fixed z-[9999] w-screen bg-[#000000AB] text-white h-screen flex items-start justify-center transition-opacity duration-300 ease-in-out pt-64"
    :class="
      active
        ? 'opacity-100 backdrop-blur-sm'
        : 'opacity-0 pointer-events-none backdrop-blur-0'
    "
    @click="handleClick($event)"
  >
    <div
      class="flex flex-col mx-4 w-full max-w-2xl bg-[#0D0D0D] p-4 rounded-xl border border-[#404040] shadow-lg"
    >
      <!-- Search Bar -->
      <form
        class="flex w-full gap-2 bg-[#060606FF] p-2 rounded-md mb-4"
        @submit="submitSearchTerm"
      >
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
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
        <input
          type="text"
          class="bg-transparent outline-none border-none text-white w-full"
          autocomplete="off"
          v-model="search"
          ref="inputToFocus"
        />
      </form>

      <section class="mb-4">
        <h3 class="text-[#FFFFFF7B] pl-1 mb-2">User Settings</h3>
        <CommandBarListInput
          text="Username"
          type="text"
          keyName="username"
          default="You"
        />
      </section>
      <section class="mb-4">
        <div class="text-[#FFFFFF7B] pl-1 text-md mb-2">ChatGPT Settings</div>
        <CommandBarListInput
          text="API Key"
          type="sensitive"
          keyName="ChatGPTAPIKey"
        />
        <CommandBarListInput text="Voice" type="text" keyName="ChatGPTVoice" />
      </section>
      <section class="mb-4">
        <div class="text-[#FFFFFF7B] pl-1 text-md mb-2">Gemini Settings</div>
        <CommandBarListInput
          text="API Key"
          type="sensitive"
          keyName="GeminiAPIKey"
        />
        <CommandBarListInput text="Voice" type="text" keyName="GeminiVoice" />
      </section>

      <section class="mb-4">
        <div class="text-[#FFFFFF7B] pl-1 text-md mb-2">Eleven Labs</div>
        <CommandBarListInput
          text="API Key"
          type="sensitive"
          keyName="ElevenLabsAPIKey"
        />
      </section>
    </div>
  </div>
</template>

<script>
import CommandBarListInput from "./CommandBarListInput.vue";
export default {
  name: "CommandBar",
  props: {
    active: Boolean,
    toggleCommandBar: Function,
  },

  components: {
    CommandBarListInput,
  },

  methods: {
    handleClick(event) {
      // Only toggle if the event was triggered on this div and not a child.
      // This prevents the command bar from closing when clicking inside it.
      if (event.target === event.currentTarget) {
        this.toggleCommandBar();
      }
    },

    submitSearchTerm(e) {
      e.preventDefault();
      // Emit the search term to the parent component
      this.$emit("submitQuery", this.search);
      this.search = "";
      this.$emit("closeCommandBar", false);
    },
  },

  watch: {
    active(newVal) {
      if (newVal) {
        this.$nextTick(() => {
          this.$refs.inputToFocus.focus();
        });
      }
    },
  },

  data() {
    return {
      search: "",
    };
  },
};
</script>

<style></style>
