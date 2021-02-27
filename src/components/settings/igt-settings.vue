<template>
  <div class="feature-tab">
    <div class="flex flex-row">
      <button class="btn btn-red" @click="resetSave">Reset save</button>
      <button class="btn btn-blue" @click="save">Save</button>
    </div>
    <igt-boolean-setting :setting=saveSetting></igt-boolean-setting>
  </div>
</template>

<script>
import {App} from "@/App.ts"
import {Settings} from "@/ig-template/features/settings/Settings";
import IgtBooleanSetting from "@/components/settings/igt-boolean-setting";
import {SettingId} from "@/ig-template/features/settings/SettingId";

export default {
  name: "igt-settings",
  components: {IgtBooleanSetting},
  data() {
    return {
      game: App.game
    }
  },

  props: {
    settings: {
      type: Settings,
      required: true
    },
  },

  methods: {
    resetSave() {
      if (confirm("Are you sure you want to delete your save? This does not provide you with bonuses")) {
        this.game.deleteSave();
        location.reload();
      }
    },
    save() {
      this.game.save();
    }
  },

  computed: {
    saveSetting() {
      return this.settings.getSetting(SettingId.ShowSaveMessage);
    }
  }
  ,
}
</script>

<style scoped>
</style>
