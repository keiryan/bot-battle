<template>
  <button
    @click="action ? copy(message.message) : read()"
    class="pr-1 opacity-50 hover:opacity-100 transition-all duration-200 ease-in-out"
  >
    <slot></slot>
  </button>
</template>

<script>
import read from "../utils/read.js";
import copy from "../utils/copy.js";
export default {
  name: "MessageIconAction",
  props: {
    action: String,
    message: Object,
  },
  data() {
    return {
      read,
      copy,
    };
  },
};
</script>

<style></style>
