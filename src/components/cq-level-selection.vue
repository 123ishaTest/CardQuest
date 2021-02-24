<template>
  <div class="m-4 p-4 border-2 bg-red-600">
    Level selection

    <div class="flex flex-row flex-wrap">
      <div :key="level.id" v-for="level in levels" class="flex flex-col m-2 p-2 bg-yellow-100">
        <button class="btn btn-blue" @click="goOnAnAdventure(level.id)" :disabled="!canStartAdventure">
          {{ level.name }}
        </button>

        <div class="flex flex-col">
          <div :key="level.id + '-' + card[0]" v-for="card in level.cards" class="my-2">
            <div class="flex flex-row justify-between">

            <div>{{ card[0] }} - {{ card[1].title }}

            </div>
            <img :title="card[1].description" class="mx-2 w-8 h-8 inline"
                 :src="require(`@/assets/cards/${card[1].image}`)">
            </div>

          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import {App} from "@/App.ts"

export default {
  name: "cq-level-selection",
  data() {
    return {
      game: App.game,
    }
  },

  props: {
    levels: {
      type: Array,
      required: true
    },
  },

  methods: {
    goOnAnAdventure(levelId) {
      this.game.goOnAnAdventure(levelId);
    }
  },
  computed: {
    canStartAdventure() {
      return this.game.canStartAdventure();
    }
  }


}
</script>

<style scoped>

</style>
