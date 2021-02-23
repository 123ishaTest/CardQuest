<template>
  <div class="relative text-center text-white w-12">
    <img :src="require(`@/assets/orbs/${svg}`)">
    <div class="centered w-6 text-xl">{{ value }}</div>
  </div>
</template>

<script>

export default {
  name: "cq-orb",
  props: {
    svg: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
  },

}
</script>

<style scoped>
.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
