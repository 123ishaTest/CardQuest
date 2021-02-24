<template>
  <div class="relative text-center text-white w-12">
    <img :src="require(`@/assets/orbs/${svg}`)">
    <div class="centered w-6 text-xl font-semibold stroke">{{ value }}</div>
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
      required: true,
    },
  },

}
</script>

<style scoped>
.stroke {
  color: white;
  text-shadow: -1px -1px 0 #000,
  1px -1px 0 #000,
  -1px 1px 0 #000,
  1px 1px 0 #000;
}

.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
