<template>
  <div>

    <!--    <igt-wallet></igt-wallet>-->
    <cq-adventure></cq-adventure>
    <button class="btn btn-blue" @click="goOnAnAdventure()">Lets go on an adventure!</button>
    <cq-card-collection></cq-card-collection>
    <igt-developer-panel></igt-developer-panel>

  </div>

</template>

<script>
import {App} from "@/App.ts"
import IgtDeveloperPanel from "@/components/developer-panel/igt-developer-panel";
import CqAdventure from "@/components/cq-adventure";
import CqCardCollection from "@/components/cg-card-collection";

export default {
  components: {CqCardCollection, CqAdventure, IgtDeveloperPanel},
  data() {
    return {
      game: App.game
    }
  },

  methods: {
    pause() {
      this.game.pause();
    },
    start() {
      this.game.start();
    },
    resume() {
      this.game.resume();
    },
    stop() {
      this.game.stop();
    },
    goOnAnAdventure() {
      this.game.goOnAnAdventure();
    }
  },
  computed: {
    state() {
      return this.game.state;
    }
  }
}
</script>

<style>
</style>
