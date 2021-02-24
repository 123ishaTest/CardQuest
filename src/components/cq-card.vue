<template>
  <div id="playable-card" class="w-48 h-72 p-2 m-2 border-2 bg-blue-400 flex flex-col
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

        <p class="text-sm italic">{{ card.description }}</p>

      </div>
    </div>

    <!-- Orbs-->
    <div class="flex flex-row justify-between">
      <cq-orb v-if="card.weapon" svg="sword.svg" :value="card.weapon.attack +'/' + card.weapon.defense"></cq-orb>

      <cq-orb v-for="cost in card.costs" :key=cost.toString()
              :class="{'text-red-500' : !canAfford && isInHand}"
              :svg="cost.type.toLowerCase() + '.svg'" :value="-cost.amount">
      </cq-orb>

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
import {EnemyCard} from "@/card-quest/cards/content/monster/EnemyCard";

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

  mounted() {
    if (!this.isInHand && this.card instanceof EnemyCard) {
      this.card.onAttack.subscribe(() => {
        this.$el.classList.add('shake');
        setTimeout(() => {
          this.$el.classList.remove('shake');
        }, 350)
      });
    }
  }

}
</script>

<style scoped>
.shake {
  animation: shake 0.5s;
  animation-iteration-count: infinite;
}

@keyframes shake {
  0% {
    transform: translate(1px, 1px) rotate(0deg);
  }
  10% {
    transform: translate(-1px, -2px) rotate(-1deg);
  }
  20% {
    transform: translate(-3px, 0px) rotate(1deg);
  }
  30% {
    transform: translate(3px, 2px) rotate(0deg);
  }
  40% {
    transform: translate(1px, -1px) rotate(1deg);
  }
  50% {
    transform: translate(-1px, 2px) rotate(-1deg);
  }
  60% {
    transform: translate(-3px, 1px) rotate(0deg);
  }
  70% {
    transform: translate(3px, 1px) rotate(-1deg);
  }
  80% {
    transform: translate(-1px, -1px) rotate(1deg);
  }
  90% {
    transform: translate(1px, 2px) rotate(0deg);
  }
  100% {
    transform: translate(1px, -2px) rotate(-1deg);
  }
}
</style>
