<template>
  <div class="relative text-center text-white w-12">
    <img :src="require(`@/assets/orbs/${svg}`)" :alt="svg">
    <div class="centered text-2xl font-semibold stroke">
      {{ formattedValue }}
    </div>
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
  computed: {
    formattedValue() {
      if (this.value === Infinity) {
        return '∞';
      }
      if (this.value === -Infinity) {
        return '-∞'
      }
      return this.value;
    }
  }

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
