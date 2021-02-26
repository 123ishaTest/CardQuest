<template>
  <div class="flex flex-row p-2 items-center">
    <cq-orb title="When this reaches 0, you are defeated" class="m-2" svg="heart.svg" :value="health"></cq-orb>
    <p>{{ stats.activeWeapon.name }}</p>
    <cq-orb :title="'You have ' + attack +' attack and ' + defense + ' defense'" class="m-2" svg="sword.svg" :value="attack +'/' + defense"></cq-orb>
    <img class="m-2 w-12 h-12" :title="ToolTier[stats.activeAxe] + ' Axe'"
         :src="require(`@/assets/cards/hatchet-${ToolTier[stats.activeAxe].toLowerCase()}.svg`)">
    <img class="m-2 w-12 h-12" :title="ToolTier[stats.activePickaxe] + ' Pickaxe'"
         :src="require(`@/assets/cards/pickaxe-${ToolTier[stats.activePickaxe].toLowerCase()}.svg`)">
    <img class="m-2 w-12 h-12" :title="ToolTier[stats.activeScythe] + ' Scythe'"
         :src="require(`@/assets/cards/scythe-${ToolTier[stats.activeScythe].toLowerCase()}.svg`)">

    <cq-orb title="Use wood to craft items!" class="m-2" svg="wood.svg" :value="wallet.wood"></cq-orb>
    <cq-orb title="Use food to heal up!" class="m-2" svg="grain.svg" :value="wallet.grain"></cq-orb>
    <cq-orb title="Use souls to play action cards!" class="m-2" svg="souls.svg" :value="wallet.souls"></cq-orb>
    <cq-orb title="Use bronze to upgrade tools!" class="m-2" svg="bronze.svg" :value="wallet.bronze"></cq-orb>
    <cq-orb title="Use silver to upgrade tools!" class="m-2" svg="silver.svg" :value="wallet.silver"></cq-orb>
    <cq-orb title="Use silver to upgrade tools" class="m-2" svg="gold.svg" :value="wallet.gold"></cq-orb>
  </div>
</template>

<script>
import {ToolTier} from "@/card-quest/adventure/tools/ToolTier";

import {PlayerStats} from "@/card-quest/adventure/PlayerStats";
import CqOrb from "@/components/orbs/cq-orb";
import {Wallet} from "@/ig-template/features/wallet/Wallet";

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
    wallet: {
      type: Wallet,
      required: true
    },
  },

  computed: {
    health() {
      return this.stats.health;
    },
    attack() {
      return this.stats.getAttack();
    },
    defense() {
      return this.stats.getDefense();
    }
  }


}
</script>

<style scoped>

</style>
