<template>
  <div class="m-4 p-4 bg-blue-700">
    Card collection
    <button class="btn btn-green" @click="openCardPack(0)">Open pack</button>
    <div class="flex flex-row flex-wrap">

      <div :key=card.amount v-for="(card, index) in displayableCards" class="flex flex-col">
        <div class="flex flex-row items-center m-2">
          <button class="btn btn-red" @click="removeCard(index)" :disabled="currentDeck.getCountForCard(index) <= 0">
            -
          </button>
          <p class="text-lg text-center">
            {{ currentDeck.getCountForCard(index) }} / {{ card[1] }}
          </p>
          <button class="btn btn-green" @click="addCard(index)"
                  :disabled="currentDeck.getCountForCard(index) >= card[1]">+
          </button>

        </div>

        <cq-card :show-front="card[1] > 0" :is-in-hand="false" :card="card[0]"></cq-card>

      </div>
    </div>

  </div>
</template>

<script>

import {App} from "@/App.ts";
import CqCard from "@/components/cq-card";

export default {
  name: "cq-card-collection",
  components: {CqCard},
  data() {
    return {
      collection: App.game.features.collection
    }
  },

  computed: {
    cards() {
      return this.collection.cards;
    },
    displayableCards() {
      return this.collection.getCardsWithAmount();
    },
    currentDeck() {
      return this.collection.currentDeck;
    }

  },
  methods: {
    openCardPack(id) {
      this.collection.openCardPack(id);
    },
    addCard(id) {
      this.collection.currentDeck.addCard(id)
    },
    removeCard(id) {
      this.collection.currentDeck.removeCard(id)
    }
  }

}
</script>

<style scoped>

</style>
