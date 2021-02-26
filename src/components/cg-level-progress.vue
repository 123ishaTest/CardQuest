<template>
  <div class="bg-cq-slate p-4">
    <p v-if=showCurrentTurn class="text-lg">Turn {{ currentTurn }}</p>
    <hr/>
    <div class="flex flex-col">
      <div :key=futureCard[0] v-for="futureCard in futureCards" class="has-tooltip">
        <div class="flex flex-row justify-between items-center">

          <div class="m-2">{{ futureCard[0] - currentTurn }} - {{ futureCard[1].title }}</div>
          <img :title="futureCard[1].description" class="w-8 h-8 inline"
               :src="require(`@/assets/cards/${futureCard[1].image}`)">
        </div>
        <cq-card :card="futureCard[1]" class="tooltip" :is-in-hand="false" :can-hover="false"></cq-card>

      </div>
    </div>

  </div>
</template>

<script>

import {Level} from "@/card-quest/adventure/Level";
import CqCard from "@/components/cq-card";

export default {
  name: "cq-level-progress",
  components: {CqCard},
  // components: {CqCard},
  props: {
    level: {
      type: Level,
      required: true
    },
    showCurrentTurn: {
      type: Boolean,
      required: true,
    },
    currentTurn: {
      type: Number,
      required: true
    },
  },

  computed: {
    futureCards() {
      return this.level.getFutureCards(this.currentTurn);
    },
    firstCard() {
      return this.level.getNextCard(this.currentTurn);
    }
  }

}
</script>

<style scoped>

</style>
