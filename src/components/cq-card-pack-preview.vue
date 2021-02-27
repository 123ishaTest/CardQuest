<template>
  <div class="bg-cq-charcoal p-4 shadow-lg">
    <div class="text-2xl font-semibold text-white">Possible Rewards</div>
    <hr>
    <div class="flex flex-col">
      <p :key="card.id + '-' + index" v-for="(card, index) in rewardCards" class="flex flex-row text-white">
        {{ card.title }}
      </p>
    </div>
  </div>
</template>

<script>

import {App} from "@/App.ts";
import {CardRepository} from "@/card-quest/cards/CardRepository";

export default {
  name: "cq-card-pack-preview",

  data() {
    return {
      cardCollection: App.game.features.collection
    }
  },
  props: {
    packId: {
      type: String,
      required: true
    },
  },
  computed: {
    pack() {
      return this.cardCollection.getCardPack(this.packId);
    },
    outcomes() {
      return this.pack.outcomes;
    },
    rewardCards() {
      return this.outcomes.map(outcome => {
        return CardRepository.getCard(outcome.item)
      })
    }
  },

}
</script>

<style scoped>

</style>
