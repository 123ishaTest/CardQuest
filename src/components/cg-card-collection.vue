<template>
  <div class="m-4 p-4 bg-blue-700">
    Card collection
    <button class="btn btn-green" @click="openCardPack(0)">Open pack</button>
    <div class="flex flex-row flex-wrap">

      <div :key=card.amount v-for="card in displayableCards" class="flex flex-col">
        <p class="text-lg text-center">
          {{ card[1] }}
        </p>

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

  },
  methods: {
    openCardPack(id) {
      this.collection.openCardPack(id);
    }
  }

}
</script>

<style scoped>

</style>
