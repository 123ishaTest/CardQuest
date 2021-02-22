<template>
  <div class="flex flex-row p-2 border-2">
    <p class="text-lg m-2"> {{ health }} Health</p>
    <p class="text-lg m-2"> Attack/Defense {{ attack }}/{{ defense }}</p>

    <img :title="ToolTier[stats.activeAxe] + ' Axe'" class="w-12 h-12" :src="require(`@/assets/cards/hatchet-${ToolTier[stats.activeAxe].toLowerCase()}.svg`)">

    <p class="text-lg m-2"> {{ ToolTier[stats.activeAxe] }} Axe</p>
    <p class="text-lg m-2"> {{ ToolTier[stats.activePickaxe] }} Pickaxe</p>
    <p class="text-lg m-2"> {{ ToolTier[stats.activeScythe] }} Scythe</p>
  </div>
</template>

<script>
import {ToolTier} from "@/card-quest/adventure/tools/ToolTier";

import {PlayerStats} from "@/card-quest/adventure/PlayerStats";

export default {
  name: "cq-player-stats",
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
