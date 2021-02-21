<template>
  <div class="w-32 h-64 p-2 m-2 border-2 bg-blue-400 cursor-pointer">
    {{ card.description }}
    <p v-if="card.health">
      Health: {{ card.health }}
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
      required: true
    },
  },


}
</script>

<style scoped>

</style>
