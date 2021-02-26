<template>
  <div class="m-4 p-4 bg-blue-700">
    <igt-boolean-setting :setting="showUnobtainedCardsSetting"></igt-boolean-setting>

    <div class="flex flex-row">
      <div class="flex flex-row flex-wrap">

        <div :key=card.amount v-for="(card, index) in cards" class="flex flex-col">
          <div v-if="card[1] > 0 || showUnobtainedCardsSetting.value">
            <div class="flex flex-row justify-between items-center m-2">
              <button class="btn btn-red" @click="removeCard(index)"
                      :disabled="currentDeck.getCountForCard(index) <= 0">
                -
              </button>
              <p class="text-lg text-center">
                {{ currentDeck.getCountForCard(index) }} / {{ card[1] }}
              </p>
              <button class="btn btn-green" @click="addCard(index)"
                      :disabled="currentDeck.getCountForCard(index) >= card[1]">+
              </button>

            </div>
            <div @click="addCard(index, currentDeck.getCountForCard(index) >= card[1])"
                 :disabled="currentDeck.getCountForCard(index) >= card[1]">

              <cq-card :show-front="true" :is-in-hand="false" :is-disabled="card[1] <= 0" :card="card[0]"></cq-card>
            </div>
          </div>
        </div>
      </div>

    </div>


  </div>
</template>

<script>

import {App} from "@/App.ts";
import CqCard from "@/components/cq-card";
import IgtBooleanSetting from "@/components/settings/igt-boolean-setting";
import {SettingId} from "@/ig-template/features/settings/SettingId";
import {IdDeck} from "@/card-quest/cards/IdDeck";

export default {
  name: "cq-card-selection-list",
  components: {IgtBooleanSetting, CqCard},
  data() {
    return {
      showUnobtainedCardsSetting: App.game.features.settings.getSetting(SettingId.ShowUnobtainedCards),
    }
  },

  props: {
    cards: {
      type: Array,
      required: true
    },
    currentDeck: {
      type: IdDeck,
      required: true,
    }
  },
  methods: {
    addCard(id, atMax) {
      if (atMax) {
        return;
      }
      this.collection.currentDeck.addCard(id)
    },
    emptyCurrentDeck() {
      this.collection.emptyCurrentDeck();
    },
    removeCard(id) {
      this.collection.currentDeck.removeCard(id)
    },
  },

}
</script>

<style scoped>

</style>
