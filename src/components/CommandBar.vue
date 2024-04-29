<template>
  <div
    class="fixed w-screen bg-[#000000AB] text-white h-screen flex items-center justify-center transition-opacity duration-300 ease-in-out"
    :class="active ? 'opacity-100 backdrop-blur-sm' : 'opacity-0 pointer-events-none backdrop-blur-0'"
  >
    This the command bar!
  </div>
</template>

<script>
export default {
  name: "CommandBar",
  props: {
    active: Boolean,
  },
};
</script>

<style></style>
