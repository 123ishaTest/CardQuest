<template>
  <div class="feature-tab">
    <div class="flex flex-col m-4 p-4">
      <div class="flex flex-row flex-initial justify-between">
        <p class="text-2xl font-semibold text-white">Turn</p>
      </div>
      <div class="flex flex-row" v-for="(entry, index) in currentCards" :key="'entry-'+index">
        <input class="input-primary" type="text" v-model="entry[0]">

        <select class="input-primary" v-model="entry[1]">

          <option :value="-1">
            None
          </option>

          <option :key="card.id" v-for="card in availableCards" :value="card.id">
            {{ card.title }}
          </option>

        </select>

      </div>
    </div>
    <button class="btn btn-green" @click="goOnCustomAdventure">Go on custom adventure!</button>
    <button class="btn btn-blue" @click="exportLevel">Export Level</button>
    <button class="btn btn-green" @click="importLevel">Import Level</button>
    <button class="btn btn-red" @click="resetToDefault">Reset to default</button>
  </div>
</template>

<script>

import {App} from "@/App.ts";
import {LevelEditor} from "@/card-quest/features/level-editor/LevelEditor";
import {CardRepository} from "@/card-quest/cards/CardRepository";
import {CardType} from "@/card-quest/cards/CardType";

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
      const level = this.editor.getLevel();
      if (level) {
        App.game.goOnCustomAdventure(level);
        document.getElementById('adventure-tab-button').click();
      }
    },
    exportLevel() {
      alert(this.editor.toLevelString());
    },
    resetToDefault() {
      this.editor.resetToDefault();
    },
    importLevel() {
      const string = prompt("Enter the level code")
      if (string) {
        this.editor.fromLevelString(string);
      }
    }
  },
  computed: {
    availableCards() {
      return CardRepository.getAllCards().filter(card => {
        return card.cardType === CardType.Monster || card.cardType === CardType.Curse
      })
    },
    currentCards() {
      return this.editor.currentCards;
    },
  },
}
</script>

<style scoped>

</style>
