<template>
  <div v-if="isActive" class="feature-tab">
    <div class="flex flex-row">

      <cq-level-progress class="w-64" :level="adventure.level" :current-turn="adventure.currentTurn"
                         :show-current-turn="true"></cq-level-progress>

      <div class="flex-auto overflow-hidden items-center">
        <!-- The field -->
        <div class="h-96 shadow-lg bg-cq-charcoal p-4 flex flex-row items-center">
          <div class="flex flex-row overflow-x-auto overflow-y-hidden">
            <div :key="'field-' + card.id + '-' + index"
                 v-for="(card, index) in field">
              <cq-card-placeholder v-if="card.id === -1"></cq-card-placeholder>
              <cq-card v-else :card=card :is-in-hand="false" @click.native="tap(index)"/>
            </div>
          </div>
        </div>

        <cq-player-stats :stats="adventure.playerStats" :wallet="adventure.wallet"></cq-player-stats>

        <div class="h-96 shadow-lg bg-cq-charcoal p-4 flex flex-row items-center">
          <div class="flex flex-row overflow-x-auto overflow-y-hidden">
            <cq-card :is-in-hand="true"
                     :can-afford="card.canAfford(adventure.wallet)"
                     :is-disabled="!card.canPlay(adventure) || !card.canAfford(adventure.wallet)"
                     @click.native="play(index, $event)" :card=card
                     :key="'hand-' + card.id + '-' + index"
                     v-for="(card, index) in hand"
                     :class="{'invisible': card.id === -1}"/>
          </div>
        </div>

        <button class="btn btn-green" @click="draw" :disabled="!canDraw">
          <span>Draw (D) ({{ deckSize }})</span>
        </button>
        <button class="btn btn-blue" @click="wait">Wait (W)</button>
        <button class="btn btn-red" @click="forfeit">Forfeit (Q)</button>


      </div>


    </div>

  </div>
</template>

<script>
import {App} from "@/App.ts"
import CqCard from "@/components/cq-card";
import CqPlayerStats from "@/components/cq-player-stats";
import CqLevelProgress from "@/components/cg-level-progress";
import CqCardPlaceholder from "@/components/cq-card-placeholder";

export default {
  name: "cq-adventure",
  components: {CqCardPlaceholder, CqLevelProgress, CqPlayerStats, CqCard},
  data() {
    return {
      adventure: App.game.features.adventure,
    }
  },

  methods: {
    draw() {
      this.adventure.draw();
    },
    wait() {
      this.adventure.wait();
    },
    forfeit() {
      this.adventure.forfeit();
    },
    play(index, $event) {
      if ($event.shiftKey) {
        this.adventure.discard(index);
        return;
      }
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
    isActive() {
      return this.adventure.isActive;
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
