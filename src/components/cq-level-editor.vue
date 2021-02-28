<template>
  <div class="feature-tab">
    <div class="flex flex-col m-4 p-4">
      <div class="flex flex-row flex-initial justify-between">
        <p class="text-2xl font-semibold text-white">Turn</p>
      </div>
      <div class="flex flex-row" v-for="(entry, index) in currentCards" :key="'entry-'+index">
        <input class="input-primary" type="text" v-model="entry[0]">

        <select class="input-primary" v-model="entry[1]">
          <option :key="card.id" v-for="card in availableCards" :value="card.id">
            {{ card.title }}
          </option>
        </select>

      </div>
    </div>
    <button class="btn btn-green" @click="goOnCustomAdventure">Go on custom adventure!</button>
  </div>
</template>

<script>

import {App} from "@/App.ts";
import {LevelEditor} from "@/card-quest/features/level-editor/LevelEditor";
import {CardRepository} from "@/card-quest/cards/CardRepository";

export default {
  name: "cq-level-editor",

  props: {
    editor: {
      type: LevelEditor,
      required: true,
    },
  },

  methods: {
    goOnCustomAdventure() {
      App.game.goOnCustomAdventure(this.editor.getLevel());
    }
  },
  computed: {
    availableCards() {
      return CardRepository.getAllCards()
    },
    currentCards() {
      return this.editor.currentCards;
    },
  },
}
</script>

<style scoped>

</style>
