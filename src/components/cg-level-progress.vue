<template>
  <div class="p-4">
    <div v-if="level.id === 0 && showCurrentTurn" class="bg-red-300 p-4">
      Here you can see the cards that the enemy will play next. Prepare yourself!
    </div>
    <p v-if=showCurrentTurn class="text-lg text-white">Turn {{ currentTurn }}</p>
    <hr/>
    <div class="flex flex-col mt-2">
      <div :key=futureCard[0] v-for="(futureCard, index) in futureCards">


        <div class="flex flex-row justify-between items-center has-tooltip">

          <cq-orb :value="futureCard[0] - currentTurn" svg="clock.svg"></cq-orb>

          <div class="m-2 text-white">{{ futureCard[1].title }}
          </div>
          <img :title="futureCard[1].description" class="w-8 h-8 inline"
               :src="require(`@/assets/cards/${futureCard[1].image}`)">
          <cq-card :card="futureCard[1]" class="tooltip ml-48" :is-in-hand="false" :can-hover="false"
                   :can-click="false"></cq-card>
        </div>
        <cq-card :class="{'shake': futureCard[0] === currentTurn + 1}" v-if="index === 0 && firstCardLarge"
                 :card="futureCard[1]" :is-in-hand="false"
                 :can-hover="false"
                 :can-click="false"></cq-card>


      </div>
    </div>

  </div>
</template>

<script>

import {Level} from "@/card-quest/adventure/Level";
import CqCard from "@/components/cq-card";
import CqOrb from "@/components/orbs/cq-orb";

export default {
  name: "cq-level-progress",
  components: {CqOrb, CqCard},
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
    firstCardLarge: {
      type: Boolean,
      default: false,
    }
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
