<template>
  <div class="m-4 p-4 border-2 bg-red-600">

    <cq-super-powers :powers="superPowers"></cq-super-powers>

    <div class="flex flex-row flex-wrap">
      <div :key="level.id" v-for="level in levels" class="flex flex-col m-2 p-4 bg-yellow-100">
        <button class="btn btn-blue" @click="goOnAnAdventure(level.id)" :disabled="!canStartAdventure">
          {{ level.name }}
        </button>
        <p class="italic">{{ level.description }}</p>
        <cq-level-progress :show-current-turn=false :current-turn="0" :level="level"></cq-level-progress>

      </div>
    </div>
  </div>
</template>

<script>
import {App} from "@/App.ts"
import CqLevelProgress from "@/components/cg-level-progress";
import CqSuperPowers from "@/components/cq-super-powers";

export default {
  name: "cq-level-selection",
  components: {CqSuperPowers, CqLevelProgress},
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
    },
    superPowers() {
      return this.game.features.superPowers;
    }
  }


}
</script>

<style scoped>

</style>
