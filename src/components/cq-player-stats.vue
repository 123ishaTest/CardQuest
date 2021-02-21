<template>
  <div class="flex flex-row p-2 border-2">
    <p class="text-lg m-2"> {{ health }} Health</p>
    <p class="text-lg m-2"> Attack/Defense {{ attack }}/{{ defense }}</p>
    <p class="text-lg m-2"> {{ Axe[stats.activeAxe] }} Axe</p>
  </div>
</template>

<script>
import {Axe} from "@/card-quest/adventure/tools/Axe";

import {PlayerStats} from "@/card-quest/adventure/PlayerStats";

export default {
  name: "cq-player-stats",
  data() {
    return {
      Axe: Axe,
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
