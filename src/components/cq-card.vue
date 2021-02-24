<template>
  <div class="w-48 h-72 p-2 m-2 border-2 bg-blue-400 flex flex-col
transition duration-300 ease-out transform hover:-translate-y-1 hover:scale-110"
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

        <div class="flex flex-row justify-between">
          <cq-orb :class="{'text-red-500' : !canAfford && isInHand}" :key=cost.toString() v-for="cost in card.costs"
                  :svg="cost.type" :value="-cost.amount"></cq-orb>
        </div>

      </div>
    </div>

    <!-- Orbs-->
    <div class="flex flex-row justify-between">

      <cq-orb v-if="card.health" svg="heart.svg" :value="card.health"></cq-orb>
      <cq-orb v-if="card.nextAttack" svg="clock.svg" :value="card.nextAttack"></cq-orb>
      <cq-orb v-if="card.attack" svg="sword.svg" :value="card.attack +'/' + card.defense"></cq-orb>
    </div>
  </div>

</template>

<script>

import {PlayableCard} from "@/card-quest/cards/abstract/PlayableCard";
import CqOrb from "@/components/orbs/cq-orb";
import {CurrencyType} from "@/ig-template/features/wallet/CurrencyType";

export default {
  name: "cq-card",
  components: {CqOrb},
  data() {
    return {
      defaultImg: "require('@/assets/logo.png')",
      CurrencyType: CurrencyType,
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
