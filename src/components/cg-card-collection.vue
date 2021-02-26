<template>
  <div class="m-4 p-4 bg-blue-700">
    <p class="text-2xl font-semibold">Card collection</p>
    <hr/>
    <igt-modal v-if="showModal" @close="showModal = false" :cards="gainedCards">
    </igt-modal>

    <igt-boolean-setting :setting="showUnobtainedCardsSetting"></igt-boolean-setting>

    <div class="flex flex-row">
      <div class="flex-auto">
        <button class="btn btn-green" @click="openCardPack(0)">Open example pack</button>
        <button class="btn btn-green" @click="openCardPack(1)">Open bronze tool pack</button>
        <button class="btn btn-green" @click="openCardPack(2)">Open silver tool pack</button>
        <button class="btn btn-green" @click="openCardPack(5)">Open variety pack</button>
        <div class="flex flex-row flex-wrap">

          <div :key=card.amount v-for="(card, index) in displayableCards" class="flex flex-col">
            <!-- TODO Fix showing of undiscovered cards-->
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
      <div class="flex-initial">
        <button class="btn btn-red" @click="emptyCurrentDeck">Empty current Deck</button>

        <table>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Deck Code</th>
            <th></th>
          </tr>
          <tr :key="index" v-for="(preset, index) in deckPresets">
            <td>
              <button :disabled="!preset.deckString" class="btn btn-green" @click="loadFromPreset(index)">
                Load
              </button>
            </td>
            <td>
              <input class="m-2 w-32 input-primary"
                     v-model="deckPresets[index].name">
            </td>
            <td>
              <input class="m-2 w-32 input-primary" disabled="disabled"
                     v-model="deckPresets[index].deckString">
            </td>
            <td>
              <button class="btn btn-green" @click="saveToPreset(index)">
                Save
              </button>
            </td>
          </tr>
        </table>
      </div>
    </div>

  </div>
</template>

<script>

import {App} from "@/App.ts";
import CqCard from "@/components/cq-card";
import IgtBooleanSetting from "@/components/settings/igt-boolean-setting";
import {SettingId} from "@/ig-template/features/settings/SettingId";
import IgtModal from "@/components/util/igt-card-reveal-modal";

export default {
  name: "cq-card-collection",
  components: {IgtModal, IgtBooleanSetting, CqCard},
  data() {
    return {
      showModal: false,
      gainedCards: [],
      collection: App.game.features.collection,
      showUnobtainedCardsSetting: App.game.features.settings.getSetting(SettingId.ShowUnobtainedCards),
    }
  },

  computed: {
    cards() {
      return this.collection.cards;
    },
    displayableCards() {
      return this.collection.getCardsWithAmount();
    },
    currentDeck() {
      return this.collection.currentDeck;
    },
    deckPresets() {
      return this.collection.deckPresets;
    },

  },
  methods: {
    openCardPack(id) {
      this.collection.openCardPack(id, 5);
    },
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
    saveToPreset(index) {
      this.collection.saveToPreset(index);
    },
    loadFromPreset(index) {
      this.collection.loadFromPreset(index);
    }
  },

  mounted() {
    this.collection.onCardsGain.subscribe(cards => {
      this.gainedCards = cards;
      this.showModal = true;
    })
  }
}
</script>

<style scoped>

</style>
