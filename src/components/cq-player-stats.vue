<template>
  <div class="flex flex-row p-2 border-2">
    <cq-orb class="m-2" svg="heart.svg" :value="health"></cq-orb>
    <cq-orb class="m-2" svg="sword.svg" :value="attack +'/' + defense"></cq-orb>
    <img class="m-2 w-12 h-12" :title="ToolTier[stats.activeAxe] + ' Axe'" :src="require(`@/assets/cards/hatchet-${ToolTier[stats.activeAxe].toLowerCase()}.svg`)">
    <img class="m-2 w-12 h-12" :title="ToolTier[stats.activePickaxe] + ' Pickaxe'" :src="require(`@/assets/cards/pickaxe-${ToolTier[stats.activePickaxe].toLowerCase()}.svg`)">
    <img class="m-2 w-12 h-12" :title="ToolTier[stats.activeScythe] + ' Scythe'" :src="require(`@/assets/cards/scythe-${ToolTier[stats.activeScythe].toLowerCase()}.svg`)">

  </div>
</template>

<script>
import {ToolTier} from "@/card-quest/adventure/tools/ToolTier";

import {PlayerStats} from "@/card-quest/adventure/PlayerStats";
import CqOrb from "@/components/orbs/cq-orb";

export default {
  name: "cq-player-stats",
  components: {CqOrb},
  data() {
    return {
      ToolTier: ToolTier,
    }
  },

  props: {
    stats: {
      type: PlayerStats,
      required: true
    },
  },

  computed: {
    health() {
      return this.stats.health;
    },
    attack() {
      return this.stats.getAttack();
    }, defense() {
      return this.stats.getDefense();
    }
  }


}
</script>

<style scoped>

</style>
