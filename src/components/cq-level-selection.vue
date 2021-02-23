<template>
  <div class="m-4 p-4 border-2 bg-red-600">
    Level selection

    <div class="flex flex-row flex-wrap">
      <div :key="level.id" v-for="level in levels">
        <button class="btn btn-blue" @click="goOnAnAdventure(level.id)" :disabled="!canStartAdventure">
          {{ level.name }}
        </button>

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
