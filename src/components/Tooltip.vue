<template>
  <div
    class="absolute inset-x-1/2 flex flex-col items-center z-[999]"
    :class="positionLegend[position]"
  >
    <!-- Carret -->
    <div class="arrow-up" v-if="position === 'bottom'"/>
    <!-- Body -->
    <div class="py-1 px-3 bg-[#0D0D0D] text-white rounded-md">{{ text }}</div>
    <div class="arrow-down" v-if="position === 'top'"/>
  </div>
</template>

<script>
export default {
  name: "Tooltip",
  props: {
    text: String,
    position: {
      type: String,
      default: "top",
    },
  },

  data() {
    return {
      positionLegend: {
        top: "bottom-8",
        bottom: "top-8",
        left: "right-8",
        right: "left-8",
      },
    };
  },
};
</script>

<style>
.arrow-up {
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 5px solid black;
}

.arrow-down {
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid black;
}
</style>
