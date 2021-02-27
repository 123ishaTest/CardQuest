<template>
  <div>
    <p class="text-2xl font-semibold">Starting stats</p>
    <p class="text-md">Spend your money on starting bonuses</p>
    <hr/>
    <div class="flex flex-row flex-wrap">
      <cq-super-power :power="powers.axe"></cq-super-power>
      <cq-super-power :power="powers.pickaxe"></cq-super-power>
      <cq-super-power :power="powers.scythe"></cq-super-power>
      <cq-super-power :power="powers.startingCards"></cq-super-power>
      <cq-super-power :power="powers.health"></cq-super-power>
    </div>
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
  computed: {
    totalCosts() {
      return this.powers.getTotalCosts();
    }
  }
}
</script>

<style scoped>

</style>
