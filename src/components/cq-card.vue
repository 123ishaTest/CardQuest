<template>
  <div class="w-32 h-64 p-2 m-2 border-2 bg-blue-400"
       :class="{'opacity-50': isDisabled, 'cursor-pointer': !isDisabled}">

    <p>{{ card.title }}</p>
    <hr/>

    <div v-if="!showFront">
      <img :src="require(`@/assets/cards/default.svg`)">
    </div>
    <div v-else>
      <img :src="require(`@/assets/cards/${card.image}`)">


      <p class="text-sm">{{ card.description }}</p>
      <p v-if="card.health">
        Health: {{ card.health }}
      </p>

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
</template>

<script>

import {PlayableCard} from "@/card-quest/cards/abstract/PlayableCard";

export default {
  name: "cq-card",

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
