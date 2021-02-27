<template>
  <div class="feature-tab">
    <cq-super-powers :powers="superPowers"></cq-super-powers>

    <p v-if="!hasEnoughCards" class="text-2xl font-semibold text-red-400">You need at least {{ game.MINIMUM_DECK_SIZE }}
      cards in your deck to start a level</p>
    <div class="flex flex-row flex-wrap">
      <div :key="level.id" v-for="level in availableLevels" class="flex flex-col m-2 p-4 bg-cq-brown w-72">
        <button class="btn btn-blue flex flex-row justify-between items-center has-tooltip"
                @click="goOnAnAdventure(level.id)"
                :disabled="!canStartAdventure">
          <span>
          {{ level.name }}
          </span>
          <span class="flex flex-row" :class="{'text-red-900': !canAffordPowers}">
          ({{ -totalCosts }}
            <img class="h-6 w-6" :src="require(`@/assets/coins.svg`)" alt="coins.svg">
          )
            </span>
        </button>
        <div class="flex flex-row px-4 py-2 items-center">

          <div class="has-tooltip">
            <img class="h-8 w-8" :src="require(`@/assets/card-random.svg`)" alt="draw.svg">

            <cq-card-pack-preview :pack-id="level.rewardPack" class="tooltip"></cq-card-pack-preview>
          </div>
          <span class="ml-4">{{ level.moneyReward }}</span>
          <img class="h-8 w-8" :src="require(`@/assets/coins.svg`)" alt="coins.svg">
        </div>
        <p class="italic">{{ level.description }}</p>

        <cq-level-progress :show-current-turn=false :current-turn="0" :level="level"></cq-level-progress>

      </div>
    </div>
  </div>
</template>

<script>
import {App} from "@/App.ts"
import CqLevelProgress from "@/components/cg-level-progress";
import CqSuperPowers from "@/components/cq-super-powers";
import {CurrencyType} from "@/ig-template/features/wallet/CurrencyType";
import {Currency} from "@/ig-template/features/wallet/Currency";
import CqCardPackPreview from "@/components/cq-card-pack-preview";

export default {
  name: "cq-level-selection",
  components: {CqCardPackPreview, CqSuperPowers, CqLevelProgress},
  data() {
    return {
      game: App.game,
    }
  },

  props: {
    levels: {
      type: Array,
      required: true
    },
  },

  methods: {
    goOnAnAdventure(levelId) {
      this.game.goOnAnAdventure(levelId);
    }
  },
  computed: {
    availableLevels() {
      return this.levels.filter(level => {
        return level.canAccess();
      })
    },
    hasEnoughCards() {
      return this.game.hasEnoughCards();
    },
    totalCosts() {
      return this.superPowers.getTotalCosts();
    },
    canAffordPowers() {
      return this.game.features.wallet.hasCurrency(new Currency(this.totalCosts, CurrencyType.Money));
    },
    canStartAdventure() {
      return this.game.canStartAdventure();
    },
    superPowers() {
      return this.game.features.superPowers;
    }
  }


}
</script>

<style scoped>

</style>
