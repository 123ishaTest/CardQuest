<template>
  <div class="feature-tab">
    <cq-pack-shop :packs="collection.cardPacks" :collection="collection"></cq-pack-shop>

    <p v-if="!deckIsValid" class="text-2xl font-semibold text-red-400">
      Your current deck is invalid. Have you imported a deck with cards you do not have?
    </p>
    <div class="flex flex-row">
      <div class="flex-auto">
        <div class="flex flex-row flex-wrap">

          <igt-tabs header-class="bg-cq-charcoal">
            <igt-tab name="All" :selected="true">
              <cq-card-selection-list :current-deck="currentDeck" :cards="displayableCards"></cq-card-selection-list>
            </igt-tab>
            <igt-tab name="Actions">
              <cq-card-selection-list :current-deck="currentDeck" :cards="actionCards"></cq-card-selection-list>
            </igt-tab>
            <igt-tab name="Resources">
              <cq-card-selection-list :current-deck="currentDeck" :cards="resourceCards"></cq-card-selection-list>
            </igt-tab>
            <igt-tab name="Tools">
              <cq-card-selection-list :current-deck="currentDeck" :cards="toolCards"></cq-card-selection-list>
            </igt-tab>
            <igt-tab name="Monsters">
              <cq-card-selection-list :current-deck="currentDeck" :cards="monsterCards"></cq-card-selection-list>
            </igt-tab>
            <igt-tab name="Curses">
              <cq-card-selection-list :current-deck="currentDeck" :cards="curseCards"></cq-card-selection-list>
            </igt-tab>
          </igt-tabs>
        </div>

      </div>
      <div class="flex-initial">
        <cq-deck-presets class="mt-12" :collection="collection"></cq-deck-presets>
      </div>
    </div>

  </div>
</template>

<script>

import {App} from "@/App.ts";
import {SettingId} from "@/ig-template/features/settings/SettingId";
import IgtTabs from "@/components/util/igt-tabs";
import IgtTab from "@/components/util/igt-tab";
import CqCardSelectionList from "@/components/cq-card-selection-list";
import {CardType} from "@/card-quest/cards/CardType";
import CqDeckPresets from "@/components/cq-deck-presets";
import CqPackShop from "@/components/cq-pack-shop";

export default {
  name: "cq-card-collection",
  components: {CqPackShop, CqDeckPresets, CqCardSelectionList, IgtTab, IgtTabs},
  data() {
    return {
      collection: App.game.features.collection,
      showUnobtainedCardsSetting: App.game.features.settings.getSetting(SettingId.ShowUnobtainedCards),
    }
  },

  computed: {
    deckIsValid() {
      return this.collection.currentDeckIsValid();
    },
    cards() {
      return this.collection.cards;
    },
    displayableCards() {
      return this.collection.getCardsWithAmount();
    },
    actionCards() {
      return this.collection.getCardsWithAmountByType(CardType.Action);
    },
    resourceCards() {
      return this.collection.getCardsWithAmountByType(CardType.Resource);
    },
    toolCards() {
      return this.collection.getCardsWithAmountByType(CardType.Tool);
    },
    monsterCards() {
      return this.collection.getCardsWithAmountByType(CardType.Monster);
    },
    curseCards() {
      return this.collection.getCardsWithAmountByType(CardType.Curse);
    },

    currentDeck() {
      return this.collection.currentDeck;
    },

  },
  methods: {
    emptyCurrentDeck() {
      this.collection.emptyCurrentDeck();
    },
  },

}
</script>

<style scoped>

</style>
