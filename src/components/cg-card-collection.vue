<template>
  <div class="feature-tab">
    <igt-modal v-if="showModal" @close="showModal = false" :cards="gainedCards"></igt-modal>

    <div class="flex flex-row">
      <div class="flex-auto">

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
      <div class="flex-initial">
        <cq-deck-presets class="mt-12" :collection="collection"></cq-deck-presets>
      </div>
    </div>

  </div>
</template>

<script>

import {App} from "@/App.ts";
import {SettingId} from "@/ig-template/features/settings/SettingId";
import IgtModal from "@/components/util/igt-card-reveal-modal";
import IgtTabs from "@/components/util/igt-tabs";
import IgtTab from "@/components/util/igt-tab";
import CqCardSelectionList from "@/components/cq-card-selection-list";
import {CardType} from "@/card-quest/cards/CardType";
import CqDeckPresets from "@/components/cq-deck-presets";

export default {
  name: "cq-card-collection",
  components: {CqDeckPresets, CqCardSelectionList, IgtTab, IgtTabs, IgtModal},
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
