<template>
  <div
    class="fixed z-[9999] w-screen backdrop-brightness-[0.20] text-white h-screen flex flex-col items-center justify-center transition-opacity duration-300 ease-in-out"
    :class="
      active
        ? 'opacity-100 backdrop-blur'
        : 'opacity-0 pointer-events-none backdrop-blur-0'
    "
    @click="handleClick($event)"
  >
    <div class="flex flex-col gap-6 w-full mx-4 max-w-2xl">
      <!-- Search Bar -->
      <div class="flex items-center">
        <div
          class="flex items-center cursor-pointer bg-[#060606FF] rounded-full border border-[#282828] overflow-hidden"
          :class="
            settingsOpen ? 'w-0 opacity-0 pointer-events-none' : 'p-2 mr-2'
          "
          @click="toggleSettings"
        >
          <Settings2
            size="20"
            class="transition-all duration-300 ease-in-out opacity-50 hover:opacity-100"
            :class="settingsOpen && '-translate-x-52'"
          />
        </div>
        <form
          class="flex flex-1 gap-2 bg-[#060606FF] p-2 px-3 rounded-full border border-[#282828]"
          @submit="submitSearchTerm"
        >
          <input
            type="text"
            class="bg-transparent outline-none border-none text-white w-full"
            autocomplete="off"
            v-model="search"
            ref="inputToFocus"
            placeholder="Message all chats..."
          />
          <div
            class="transition-all duration-300 ease-in-out opacity-50 hover:opacity-100 cursor-pointer"
          >
            <Search @click="submitSearchTerm" />
          </div>
        </form>
      </div>
      <div
        class="flex flex-col bg-[#060606FF] p-4 rounded-xl border border-[#404040] shadow-lg transition-all duration-300 ease-in-out overflow-hidden"
        :class="!settingsOpen ? 'max-h-0 opacity-0' : 'max-h-[30rem]'"
      >
        <div class="flex justify-between">
          <h1 class="text-xl mb-6 text-[#DFDD00]">App Settings</h1>
          <CircleX
            class="cursor-pointer transition-all duration-150 ease-in-out hover:stroke-red-500"
            @click="toggleSettings"
            size="20"
          />
        </div>
        <section class="mb-4">
          <h3 class="pl-1 mb-4 text-[#e5e4e2]">User Settings</h3>
          <CommandBarListInput
            text="Username"
            type="text"
            keyName="username"
            default="You"
          />
        </section>
        <section class="mb-4">
          <div class="pl-1 text-md mb-4 text-[#e5e4e2]">ChatGPT Settings</div>
          <CommandBarListInput
            text="API Key"
            type="sensitive"
            keyName="ChatGPTAPIKey"
          />
          <CommandBarListInput
            text="Voice"
            type="text"
            keyName="ChatGPTVoice"
          />
        </section>
        <section class="mb-4">
          <div class="pl-1 text-md mb-4 text-[#e5e4e2]">Gemini Settings</div>
          <CommandBarListInput
            text="API Key"
            type="sensitive"
            keyName="GeminiAPIKey"
          />
          <CommandBarListInput text="Voice" type="text" keyName="GeminiVoice" />
        </section>

        <section class="mb-4">
          <div class="text-[#FFFFFF7B] pl-1 text-md mb-2 text-[#e5e4e2]">
            Eleven Labs
          </div>
          <CommandBarListInput
            text="API Key"
            type="sensitive"
            keyName="ElevenLabsAPIKey"
          />
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Search, Settings2, CircleX } from "lucide-vue-next";
</script>

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

    toggleSettings() {
      this.settingsOpen = !this.settingsOpen;
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
      settingsOpen: false,
    };
  },
};
</script>

<style></style>
