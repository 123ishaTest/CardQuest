<template>
  <div>
    <igt-notifications></igt-notifications>
    <igt-modal v-if="showModal" @close="showModal = false" :cards="gainedCards">
      <div slot="header">
        <p class="text-2xl font-semibold text-white">Success!</p>
      </div>
    </igt-modal>

    <cq-lose-modal v-if="showLoseModal" @close="showLoseModal = false">
      <div slot="header">
        <p class="text-2xl font-semibold text-white">Failure!</p>
      </div>
    </cq-lose-modal>

    <igt-tabs :header-class="'bg-cq-slate'">

      <igt-tab name="Card Collection" :selected="true">
        <cq-card-collection></cq-card-collection>
      </igt-tab>


      <igt-tab name="Adventure" id="adventure-tab-button">
        <cq-adventure v-if="game.features.adventure.isActive"></cq-adventure>
        <cq-level-selection v-else :levels="allLevels"></cq-level-selection>
      </igt-tab>

      <igt-tab name="Automation">
        <cq-automation :automation="game.features.automation"></cq-automation>
      </igt-tab>

      <igt-tab name="Achievements">
        <igt-achievements :achievements-feature="game.features.achievements"></igt-achievements>
      </igt-tab>

      <igt-tab name="Level Editor">
        <cq-level-editor :editor="game.features.editor"></cq-level-editor>
      </igt-tab>

      <igt-tab name="Settings">
        <igt-settings :settings="game.features.settings"></igt-settings>
      </igt-tab>

      <igt-tab name="How to play">
        <cq-how-to-play></cq-how-to-play>
      </igt-tab>

      <igt-tab name="Credits">
        <cq-credits></cq-credits>
      </igt-tab>

      <li slot="other" class="ml-8">
        <div class="flex flex-row items-center" :title="'You have ' + game.features.wallet.money + ' coins'">
          <p class="text-lg text-white p-2">{{ game.features.wallet.money | numberFormat }}
          </p>
          <img class="h-8 w-8" :src="require(`@/assets/coins.svg`)" alt="coins.svg">
        </div>
      </li>


    </igt-tabs>


  </div>

</template>

<script>
import {App} from "@/App.ts"
import CqAdventure from "@/components/cq-adventure";
import CqCardCollection from "@/components/cg-card-collection";
import CqLevelSelection from "@/components/cq-level-selection";

import {LevelRepository} from '@/card-quest/adventure/LevelRepository';
import IgtNotifications from "@/components/util/igt-notifications";
import IgtAchievements from "@/components/igt-achievements";
import IgtTab from "@/components/util/igt-tab";
import IgtTabs from "@/components/util/igt-tabs";
import {SettingId} from "@/ig-template/features/settings/SettingId";
import IgtSettings from "@/components/settings/igt-settings";
import IgtModal from "@/components/util/igt-card-reveal-modal";
import CqHowToPlay from "@/components/cq-how-to-play";
import CqAutomation from "@/components/cq-automation";
import CqLevelEditor from "@/components/cq-level-editor";
import CqLoseModal from "@/components/cq-lose-modal";
import CqCredits from "@/components/cq-credits";

export default {
  components: {
    CqCredits,
    CqLoseModal,
    CqLevelEditor,
    CqAutomation,
    CqHowToPlay,
    IgtModal,
    IgtSettings,
    IgtTabs,
    IgtTab,
    IgtAchievements, IgtNotifications, CqLevelSelection, CqCardCollection, CqAdventure
  },
  data() {
    return {
      game: App.game,
      gainedCards: [],
      showModal: false,
      showLoseModal: false,
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
  },
  mounted() {
    this.game.onSave.subscribe(() => {
      if (this.game.features.settings.getSetting(SettingId.ShowSaveMessage).value) {
        this.$notify(
            {
              title: 'Game saved!',
              type: "success",
              group: "top-right",
            },
            4000
        );
      }
    });


    this.game.features.collection.onCardsGain.subscribe(cards => {
      this.gainedCards = cards;
      this.showModal = true;
    });

    this.game.onLose.subscribe(() => {
      this.showLoseModal = true;
    })
  }
}
</script>

<style>
</style>
