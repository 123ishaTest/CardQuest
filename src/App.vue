<template>
  <div>

<!--    <igt-wallet></igt-wallet>-->
    <cq-adventure></cq-adventure>
    <igt-developer-panel></igt-developer-panel>

  </div>

</template>

<script>
import {App} from "@/App.ts"
import IgtDeveloperPanel from "@/components/developer-panel/igt-developer-panel";
import CqAdventure from "@/components/cq-adventure";

export default {
  components: {CqAdventure, IgtDeveloperPanel},
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
