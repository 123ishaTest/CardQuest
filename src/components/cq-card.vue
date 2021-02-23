<template>
  <div class="w-48 h-72 p-2 m-2 border-2 bg-blue-400 flex flex-col"
       :class="{'opacity-50': isDisabled, 'cursor-pointer': !isDisabled}">

    <div class="flex-grow">
      <p>{{ card.title }}</p>
      <hr/>

      <div v-if="!showFront">
        <!--      <img class="card-image" :src="require(`@/assets/cards/default.svg`)">-->
        <img class="card-image" :src="require(`@/assets/cards/${card.image}`)">

      </div>
      <div v-else>
        <img class="card-image" :src="require(`@/assets/cards/${card.image}`)">


        <p class="text-sm">{{ card.description }}</p>


        <div v-if="!isInHand && card.nextAttack">
          <p>Attacks in {{ card.nextAttack }} moves</p>
          <p class="text-lg m-2"> {{ card.attack }}/{{ card.defense }}</p>

        </div>
        <p v-if="card.costs.length" :class="{'text-red-500' : !canAfford && isInHand}">Costs:</p>
        <p :class="{'text-red-500' : !canAfford && isInHand}" :key=cost.toString() v-for="cost in card.costs">
          {{ cost }}
        </p>


      </div>
    </div>

    <!-- Orbs-->
    <div class="flex flex-row justify-between">
      <cq-orb v-if="card.health" svg="heart.svg" :value="card.health"></cq-orb>
    </div>
  </div>

</template>

<script>

import {PlayableCard} from "@/card-quest/cards/abstract/PlayableCard";
import CqOrb from "@/components/orbs/cq-orb";

export default {
  name: "cq-card",
  components: {CqOrb},
  data() {
    return {
      defaultImg: "require('@/assets/logo.png')"
    }
  },

  props: {
    card: {
      type: PlayableCard,
      required: true,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    isInHand: {
      type: Boolean,
      required: true,
    },
    showFront: {
      type: Boolean,
      default: true,
    },
    canAfford: {
      type: Boolean,
      default: false,
    }
  },


}
</script>

<style scoped>

</style>
