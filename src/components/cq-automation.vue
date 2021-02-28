<template>
  <div class="feature-tab">
    <div v-if="!canAccess">
      <p class="text-lg text-white">Defeat The Wizard Level to unlock automation</p>
    </div>
    <div v-else>
      <p class="text-2xl font-semibold text-white">Automation - BETA</p>
      <hr/>
      <br>
      <p class="text-lg text-white">With automation you can automatically play and retry levels.</p>
      <p class="text-lg text-white">The 'AI' is not very smart, it can get stuck, and it won't play optimally, so use at your own
        risk.</p>
      <p class="text-lg text-white">Feel free to add your own algorithm on
        <a class="text-blue-500" target="_blank"
           href="https://github.com/123ishaTest/CardQuest/blob/master/src/card-quest/features/automation">
          GitHub
        </a>
      </p>
      <br>

      <select class="input-primary" v-model="automation.selectedLevel">
        <option :key="level.id" v-for="level in levels" :value="level.id">
          {{ level.name }}
        </option>
      </select>

      <select class="input-primary" v-model="automation.selectedStrategy">
        <option :key="strategy.id" v-for="strategy in strategies" :value="strategy.id">
          {{ strategy.title }}
        </option>
      </select>

      <p class="text-lg text-white">
        Before you activate Automation, please make sure your starting bonuses are set correctly!
      </p>
      <div class="flex flex-row p-4 items-center">
        <input class="input-primary w-4 h-4" v-model="automation.isActive" type="checkbox"/>
        <p class="text-lg font-semibold ml-2" :class="automation.isActive ? 'text-green-500' : 'text-red-500'">
          Automation {{ automation.isActive ? 'Active' : 'Inactive' }}</p>
      </div>

      <div class="flex flex-col">
        <div :key="strategy.id" v-for="strategy in strategies" class="">
          <p class="text-white">{{ strategy.title }}</p>
          <div class="text-white" v-html="strategy.description"></div>
          <hr/>
        </div>
      </div>
      <br>
    </div>
  </div>
</template>

<script>

import {Automation} from "@/card-quest/features/automation/Automation";
import {LevelRepository} from "@/card-quest/adventure/LevelRepository";

export default {
  name: "cq-automation",

  data() {
    return {
      levels: LevelRepository.getAllLevels()
    }
  },
  props: {
    automation: {
      type: Automation,
      default: 0
    },
  },

  computed: {
    canAccess() {
      return this.automation.requirement.isCompleted;
    },
    strategies() {
      return this.automation.strategies;
    },
  },
}
</script>

<style scoped>

</style>
