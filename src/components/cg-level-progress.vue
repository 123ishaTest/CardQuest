<template>
  <div class="bg-red-100">
    <p class="text-lg">
      Turn {{ currentTurn }}
    </p>
    <div class="flex flex-col">
      <div :key=futureCard[0] v-for="futureCard in futureCards" class="my-2">
        <div>{{ futureCard[0] - currentTurn }} - {{ futureCard[1].title }}
          <img :title="futureCard[1].description" class="w-8 h-8 inline"
               :src="require(`@/assets/cards/${futureCard[1].image}`)">
        </div>
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
