<template>
  <div v-show="isActive">
    <slot></slot>
  </div>
</template>

<script>

export default {
  name: "igt-tab",
  props: {
    id: {required: false},
    name: {required: true},
    selected: {default: false},
    canSelect: {default: true}
  },

  data() {
    return {
      isActive: false
    };
  },

  mounted() {
    this.isActive = this.selected;
  }
}
</script>

<style scoped>

</style>
