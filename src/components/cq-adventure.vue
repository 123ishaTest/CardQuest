<template>
  <div class="m-4 p-4 bg-red-100">
    Lets go on an adventure!

    <div class="hand">
      <div :key="card.id + '-' + index" v-for="(card, index) in hand">
        {{ card.id }}
      </div>
    </div>

    <button class="btn btn-blue" @click="draw">Draw - {{ deckSize }}</button>
  </div>
</template>

<script>
import {App} from "@/App.ts"

export default {
  name: "cq-adventure",
  data() {
    return {
      adventure: App.game.features.adventure,
    }
  },

  methods: {
    draw() {
      this.adventure.draw();
    }
  },
  computed: {
    hand() {
      return this.adventure.playerHand
    },
    deckSize() {
      return this.adventure.playerDeck.getSize();
    }
  }

}
</script>

<style scoped>

</style>
