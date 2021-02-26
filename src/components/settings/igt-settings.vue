<template>
  <div class="mx-4 p-4 bg-gray-500">
    <igt-boolean-setting :setting=saveSetting></igt-boolean-setting>
 </div>
</template>

<script>

import {Settings} from "@/ig-template/features/settings/Settings";
import IgtBooleanSetting from "@/components/settings/igt-boolean-setting";
import {SettingId} from "@/ig-template/features/settings/SettingId";

export default {
  name: "igt-settings",
  components: {IgtBooleanSetting},
  props: {
    settings: {
      type: Settings,
      required: true
    },
  },

  computed: {
    saveSetting() {
      return this.settings.getSetting(SettingId.ShowSaveMessage);
    }
  },
}
</script>

<style scoped>
</style>
