<template>
  <div class="m-4 p-4 bg-red-100">
    Lets go on an adventure!

    <!-- The field -->
    <div class="h-128 w-full border-4">
      <div class="text-lg text-center">The field</div>
      <div class="flex flex-row">
        <cq-card @click.native=tap(index) :card=card :key="card.id + '-' + index" v-for="(card, index) in field">
        </cq-card>
        <div v-if="field.length === 0" class="h-64">
          Play some cards!
        </div>
      </div>
    </div>

    <div class="h-128 w-full border-4">
      <div class="text-lg text-center">Your hand</div>
      <div class="flex flex-row">
        <cq-card @click.native=play(index) :card=card :key="card.id + '-' + index" v-for="(card, index) in hand">
        </cq-card>
        <div v-if="hand.length === 0" class="h-64">
          You have no cards
        </div>
      </div>
    </div>


    <button class="btn btn-blue" @click="draw">Draw - {{ deckSize }}</button>
  </div>
</template>

<script>
import {App} from "@/App.ts"
import CqCard from "@/components/cq-card";

export default {
  name: "cq-adventure",
  components: {CqCard},
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
      return this.adventure.playerDeck.getSize();
    }
  }

}
</script>

<style scoped>

</style>
