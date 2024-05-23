<template>
    <!-- Add new chat -->
    <div class="h-screen w-screen fixed pointer-events-none z-[9999]">
      <div
        class="absolute z-[999] top-1/2 cursor-pointer add-new-chat sidebar-menu pointer-events-auto"
        :class="totalChats > 0 ? 'flex flex-col right-4' : 'flex items-center left-1/2'"
        @mouseenter="showBackgroundBlur"
        @mouseleave="hideBackgroundBlur"
      >
        <div
          class="w-8 h-8 rounded-full opacity-0 menu-option overflow-hidden"
          :class="totalChats === 0 ? 'right-option' : 'top-option'"
        >
          <img
            src="../assets/openai.webp"
            alt="Open AI"
            class="w-full h-full"
            @click="addChat({ type: 'gpt', model: 'gpt-4o' })"
          />
        </div>
        <CirclePlus
          color="#9C9C9C"
          class="transition-transform duration-150 ease-in-out hover:rotate-180"
        />
        <div
          class="w-8 h-8 rounded-full opacity-0 menu-option overflow-hidden"
          :class="totalChats === 0 ? 'left-option' : 'bottom-option'"
        >
          <img
            src="../assets/gemini.png"
            alt="Gemini"
            class="w-full h-full"
            @click="addChat({ type: 'gemini', model: 'gemini-pro' })"
          />
        </div>
      </div>
      <div class="sidebar-menu-background" ref="blurBackground"></div>
    </div>
  </template>
  
  <script setup>
  import { CirclePlus } from "lucide-vue-next";
  </script>
  
  <script>
  export default {
    name: "NewChat",
    components: {
      CirclePlus,
    },
  
    props: {
      totalChats: Number,
    },
  
    methods: {
      addChat(params) {
        this.$emit("add-chat", params);
      },
  
      showBackgroundBlur() {
        this.$refs.blurBackground.style.opacity = 1;
        this.$refs.blurBackground.style.pointerEvents = 'all';
      },
  
      hideBackgroundBlur() {
        this.$refs.blurBackground.style.opacity = 0;
        this.$refs.blurBackground.style.pointerEvents = 'none';
      },
    },
  
    data() {
      return {
        pointerEvents: false,
      };
    },
  };
  </script>
  
  <style scoped>
  .menu-option {
    transition: transform 150ms ease-in-out, opacity 150ms ease-in-out;
  }
  
  .add-new-chat {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .add-new-chat.flex-col {
    flex-direction: column;
    gap: 10px; /* Adjust as needed for spacing between icons */
  }
  
  .add-new-chat:hover .right-option {
    transform: translateX(-10px);
    opacity: 1;
  }
  
  .add-new-chat:hover .left-option {
    transform: translateX(10px);
    opacity: 1;
  }
  
  .add-new-chat:hover .top-option {
    transform: translateY(-4px);
    opacity: 1;
  }
  
  .add-new-chat:hover .bottom-option {
    transform: translateY(4px);
    opacity: 1;
  }
  
  .sidebar-menu-background {
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(10px);
    pointer-events: none;
    transition: all 150ms ease-in-out;
    opacity: 0;
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
  }
  </style>