<template>
  <div class="bg-red-100">
    <p class="text-lg">
      Turn {{ currentTurn }}
    </p>
    <div class="flex flex-col">
      <div :key=futureCard[0] v-for="futureCard in futureCards">
        <p>{{ futureCard[0] }} - {{ futureCard[1].title }}</p>
      </div>
    </div>

  </div>
</template>

<script>

import {Level} from "@/card-quest/adventure/Level";

export default {
  name: "cq-level-progress",

  props: {
    level: {
      type: Level,
      required: true
    },
    currentTurn: {
      type: Number,
      required: true
    },
  },

  computed: {
    futureCards() {
      return this.level.getFutureCards(this.currentTurn);
    }
  }

}
</script>

<style scoped>

</style>
