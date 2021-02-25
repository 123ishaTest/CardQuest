<template>
  <div class="color-purple-500">
    <cq-super-power :power="powers.axe"></cq-super-power>
    <cq-super-power :power="powers.scythe"></cq-super-power>
  </div>
</template>

<script>


import CqSuperPower from "@/components/cq-super-power";
export default {
  name: "cq-super-powers",
  components: {CqSuperPower},

  props: {
    powers: {
      type: Array,
      required: true
    },
  },
}
</script>

<style scoped>

</style>
