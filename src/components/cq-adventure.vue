<template>
  <div class="m-4 p-4 bg-red-100">
    Lets go on an adventure!

    <!-- The field -->
    <div class="h-128 w-full border-4 bg-red-400 p-4">
      <div class="text-lg text-center">The field</div>
      <div class="flex flex-row">
        <cq-card @click.native=tap(index) :card=card :key="card.id + '-' + index" v-for="(card, index) in field"/>
        <div v-if="field.length === 0" class="h-64">
          Play some cards!
        </div>
      </div>
    </div>

    <div class="h-128 w-full border-4 bg-yellow-400 p-4">
      <div class="text-lg text-center">Your hand</div>
      <div class="flex flex-row">
        <cq-card :is-disabled="!card.canPlay(adventure)" @click.native=play(index) :card=card :key="card.id + '-' + index"
                 v-for="(card, index) in hand"/>
        <div v-if="hand.length === 0" class="h-64">
          You have no cards
        </div>
      </div>
    </div>

    <cq-adventure-resources :resources="adventure.resources"/>
    <button class="btn btn-blue" @click="draw" :disabled="!canDraw">
      <span v-if="canDraw">Draw ({{ deckSize }})</span>
      <span v-else> No cards </span>
    </button>
  </div>
</template>

<script>
import {App} from "@/App.ts"
import CqCard from "@/components/cq-card";
import CqAdventureResources from "@/components/cq-adventure-resources";

export default {
  name: "cq-adventure",
  components: {CqAdventureResources, CqCard},
  data() {
    return {
      adventure: App.game.features.adventure,
    }
  },

  methods: {
    draw() {
      this.adventure.draw();
    },
    play(index) {
      if (!this.adventure.playerHand[index].canPlay(this.adventure)) {
        return;
      }
      this.adventure.play(index);
    },
    tap(index) {
      this.adventure.tap(index);
    }
  },
  computed: {
    hand() {
      return this.adventure.playerHand;
    },
    field() {
      return this.adventure.field;
    },
    deckSize() {
      return this.deck.getSize();
    },
    deck() {
      return this.adventure.playerDeck;
    },
    canDraw() {
      return this.adventure.canDraw();
    }
  }

}
</script>

<style scoped>

</style>
