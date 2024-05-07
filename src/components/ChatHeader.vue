<template>
  <div
    class="absolute z-[999] flex justify-between w-full p-4 bg-[#141414FF] backdrop-blur-sm text-white w-full items-center"
  >
    <div class="fitems-end">
      <div class="flex items-center gap-2 text-white">
        <div
          class="text-xl font-bold"
          @click="editingNickname = true"
          v-if="!editingNickname"
        >
          {{ nickname || "AI Name" }}
        </div>

        <input
          v-if="editingNickname"
          v-model="nickname"
          @keydown.enter="editingNickname = false"
          @blur="editingNickname = false"
          class="bg-transparent border-none text-xl font-bold text-white outline-none w-full bg-red-500"
          ref="nicknameInput"
          @input="adjustWidth"
          @focus="adjustWidth"
        />

        <span class="text-slate-400 text-xs">({{ modelName }})</span>
      </div>
    </div>

    <div class="flex items-center">
      <div class="flex items-end gap-2 mx-4">
        <div class="flex">
          <SignalHigh color="#44fb07" v-if="callStats?.timeTaken <= 5000" />
          <SignalMedium color="#FB9904FF" v-if="callStats?.timeTaken > 5000" />
          <SignalLow color="#FF0000FF" v-if="callStats?.timeTaken > 10000" />
          <div class="translate-y-0.5">
            {{ callStats?.formattedTime || "0s" }}
          </div>
        </div>

        <div class="flex gap-1 translate-y-0.5">
          <CaseLower />
          <div class="">
            {{ callStats?.messageLength || "0" }}
          </div>
        </div>
      </div>

      <!-- Settings Icon -->
      <div
        class="cursor-pointer transition-all duration-300 ease-in-out hover:rotate-90"
        @click="$emit('toggle-settings')"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-5 h-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  SignalHigh,
  SignalMedium,
  SignalLow,
  CaseLower,
} from "lucide-vue-next";
</script>

<script>
export default {
  name: "ChatHeader",

  props: {
    callStats: Object,
    initialName: String,
    initialModel: String,
  },

  mounted() {
    this.nickname = this.initialName;
    this.modelName = this.initialModel;
  },

  methods: {
    adjustWidth() {
      const input = this.$refs.nicknameInput;
      if (input) {
        input.style.width = "50px"; // Reset to min width to capture smaller size if text is deleted
        input.style.width = `${input.scrollWidth}px`;
      }
    },
  },

  data() {
    return {
      nickname: "",
      editingNickname: false,
      modelName: "",
    };
  },

  watch: {
    editingNickname(newVal) {
      if (newVal) {
        this.$nextTick(() => {
          this.$refs.nicknameInput.focus();
          this.adjustWidth();
        });
      }
    },
  },
};
</script>

<style scoped>
input {
  max-width: 80%;
}
</style>
