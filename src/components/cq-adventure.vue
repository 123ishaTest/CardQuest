<template>
  <div class="m-4 p-4 bg-red-100">
    <div class="flex flex-row">

      <div class="w-1/12">
        <cq-level-progress :level="adventure.level" :current-turn="adventure.currentTurn"></cq-level-progress>
      </div>

      <div class="w-11/12">
        <!-- The resource -->
        <div class="h-128 w-full border-4 bg-red-400 p-4">
          <div class="text-lg text-center">The field</div>
          <div class="flex flex-row">
            <cq-card :is-in-hand="false" @click.native=tap(index) :card=card :key="card.id + '-' + index"
                     v-for="(card, index) in field"/>
            <div v-if="field.length === 0" class="h-64">
              Play some cards!
            </div>
          </div>
        </div>

        <div class="h-128 w-full border-4 bg-yellow-400 p-4">
          <div class="text-lg text-center">Your hand</div>
          <div class="flex flex-row">
            <cq-card :is-in-hand="true"
                     :can-afford="card.canAfford(adventure.wallet)"
                     :is-disabled="!card.canPlay(adventure)" @click.native=play(index) :card=card
                     :key="card.id + '-' + index"
                     v-for="(card, index) in hand"/>
            <div v-if="hand.length === 0" class="h-64">
              You have no cards
            </div>
          </div>
        </div>

        <button class="btn btn-blue" @click="draw" :disabled="!canDraw">
          <span v-if="canDraw">Draw ({{ deckSize }})</span>
          <span v-else> No cards </span>
        </button>

        <cq-adventure-resources :wallet="adventure.wallet"/>

        <cq-player-stats :stats="adventure.playerStats"></cq-player-stats>

      </div>


    </div>

  </div>
</template>

<script>
import {App} from "@/App.ts"
import CqCard from "@/components/cq-card";
import CqAdventureResources from "@/components/cq-adventure-resources";
import CqPlayerStats from "@/components/cq-player-stats";
import CqLevelProgress from "@/components/cg-level-progress";

export default {
  name: "cq-adventure",
  components: {CqLevelProgress, CqPlayerStats, CqAdventureResources, CqCard},
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
