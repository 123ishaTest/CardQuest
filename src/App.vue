<template>
  <div>
    <igt-notifications></igt-notifications>
    <igt-achievements :achievements-feature="game.features.achievements"></igt-achievements>
    <!--    <igt-wallet></igt-wallet>-->
    <cq-adventure></cq-adventure>
    <cq-level-selection :levels="allLevels"></cq-level-selection>
    <cq-card-collection></cq-card-collection>
    <igt-developer-panel></igt-developer-panel>

  </div>

</template>

<script>
import {App} from "@/App.ts"
import IgtDeveloperPanel from "@/components/developer-panel/igt-developer-panel";
import CqAdventure from "@/components/cq-adventure";
import CqCardCollection from "@/components/cg-card-collection";
import CqLevelSelection from "@/components/cq-level-selection";

import {LevelRepository} from '@/card-quest/adventure/LevelRepository';
import IgtNotifications from "@/components/util/igt-notifications";
import IgtAchievements from "@/components/igt-achievements";

export default {
  components: {IgtAchievements, IgtNotifications, CqLevelSelection, CqCardCollection, CqAdventure, IgtDeveloperPanel},
  data() {
    return {
      game: App.game,
      LevelRepository: LevelRepository,
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
    },
    allLevels() {
      return LevelRepository.getAllLevels();
    }
  }
}
</script>

<style>
</style>
