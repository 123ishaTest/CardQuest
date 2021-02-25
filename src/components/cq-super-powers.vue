<template>
  <div class="color-purple-500">
    <cq-super-power :power="powers.axe"></cq-super-power>
    <cq-super-power :power="powers.scythe"></cq-super-power>
  </div>
</template>

<script>
import CqSuperPower from "@/components/cq-super-power";
import {SuperPowers} from "@/card-quest/adventure/super-powers/SuperPowers";

export default {
  name: "cq-super-powers",
  components: {CqSuperPower},

  props: {
    powers: {
      type: SuperPowers,
      required: true
    },
  },
}
</script>

<style scoped>

</style>
