<template>
  <div class="flex flex-col w-48 m-2">
    <button class="btn btn-red" @click="emptyCurrentDeck">Empty current Deck</button>

    <select class="input-primary" v-model="selection" @change="selectionChanged($event)">
      <option :key="index" v-for="(preset, index) in presets" :value="index">
        {{ collection.deckPresets[index].displayName }} ({{ collection.deckPresets[index].cardCount }})
      </option>
      <option v-bind:value="presets.length">New Deck</option>
    </select>
    <div class="flex flex-row">
      <input class="w-32 input-primary w-full"
             v-model="collection.deckPresets[selection].displayName">
    </div>
    <div class="flex flex-row">

      <button class="btn btn-green w-full" @click="saveToPreset()">
        Save
      </button>

      <button :disabled="!collection.deckPresets[selection].deckString" class="btn btn-green" @click="loadFromPreset()">
        Load
      </button>

    </div>
    <div class="flex flex-row">
      <button class="btn btn-blue w-full" @click="importPreset()">
        Import
      </button>
    </div>

    <div class="flex flex-row">

      <input disabled=disabled class="w-full input-primary"
             v-model="collection.deckPresets[selection].deckString">
    </div>

    <div class="flex flex-col bg-red-100 m-1">
      <div :key="index + '-' + amount" v-for="(amount, index) in idDeck.cards" class="has-tooltip">
        <div v-if="amount !== 0">
          <div class="flex flex-row justify-between items-center px-2">
            <div class="m-2">{{ CardRepository.getCard(index).title }} ({{ amount }})</div>
            <img :title="CardRepository.getCard(index).description" class="w-8 h-8 inline"
                 :src="require(`@/assets/cards/${CardRepository.getCard(index).image}`)">
          </div>
          <cq-card :card="CardRepository.getCard(index)" class="tooltip" :is-in-hand="false"
                   :can-hover="false"></cq-card>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import {CardCollection} from "@/card-quest/features/card-collection/CardCollection";
import {DeckPreset} from "@/card-quest/features/card-collection/DeckPreset";
import {CardRepository} from "@/card-quest/cards/CardRepository";
import CqCard from "@/components/cq-card";

export default {
  name: "cq-deck-presets",
  components: {CqCard},
  data() {
    return {
      selection: 0,
      CardRepository: CardRepository,
    }
  },

  props: {
    collection: {
      type: CardCollection,
      required: true,
    },
  },
  computed: {
    presets() {
      return this.collection.deckPresets;
    },
    idDeck() {
      return CardRepository.getIdDeckFromString(this.collection.deckPresets[this.selection].deckString);
    },
  },
  methods: {

    emptyCurrentDeck() {
      this.collection.emptyCurrentDeck();
    },
    saveToPreset() {
      this.collection.saveToPreset(this.selection);
    },
    loadFromPreset() {
      this.collection.loadFromPreset(this.selection);
    },
    exportPreset() {
      alert(this.collection.deckPresets[this.selection].deckString);
    },
    importPreset() {
      const deckString = prompt("Import deck code");
      if (deckString) {
        this.collection.deckPresets[this.selection].deckString = deckString;
      }
    },
    selectionChanged() {
      if (this.selection >= this.presets.length) {
        this.collection.deckPresets.push()
        this.collection.deckPresets.splice(this.selection, 1, new DeckPreset(`Deck ${this.selection}`, ''))
      }
    }
  },
}
</script>

<style scoped>

</style>
