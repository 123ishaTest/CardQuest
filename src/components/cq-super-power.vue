<template>
  <div class="flex-1">
    <div class="flex flex-col items-center m-2">
      <p class="text-2xl text-center mx-2 text-white">
        {{ power.valueText }} {{ power.description }}
      </p>
      <p class="text-sm text-center mx-2">
      <div class="flex flex-row items-center" :title="'Activating this power costs ' + power.cost + ' coins'">
        <p class="text-2xl p-2 text-white">{{ power.cost }}</p>
        <img class="h-6 w-6" :src="require(`@/assets/coins.svg`)" alt="coins.svg">
      </div>
      <div class="flex flex-row">
        <button class="btn btn-red" @click="down()"
                :disabled="power.level <= 0">
          -
        </button>
        <button class="btn btn-green" @click="up()"
                :disabled="power.level >= power.maxLevel">
          +
        </button>
      </div>
    </div>
  </div>
</template>

<script>


import {SuperPower} from "@/card-quest/adventure/super-powers/SuperPower";

export default {
  name: "cq-super-power",

  props: {
    power: {
      type: SuperPower,
      required: true,
    },
  },

  methods: {
    down() {
      this.power.level--
    },
    up() {
      this.power.level++;
    },

  },
}
</script>

<style scoped>

</style>
