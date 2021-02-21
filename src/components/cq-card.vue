<template>
  <div class="w-32 h-64 p-2 m-2 border-2 bg-blue-400"
       :class="{'opacity-50': isDisabled, 'cursor-pointer': !isDisabled}">
    {{ card.description }}
    <p v-if="card.health">
      Health: {{ card.health }}
    </p>

    <p :key=cost v-for="cost in card.costs">
      {{ cost }}
    </p>
  </div>
</template>

<script>

import {PlayableCard} from "@/card-quest/cards/PlayableCard";

export default {
  name: "cq-card",
  data() {
    return {}
  },

  props: {
    card: {
      type: PlayableCard,
      required: true,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    }
  },


}
</script>

<style scoped>

</style>
