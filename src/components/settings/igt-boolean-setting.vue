<template>
  <div>
    <button @click="toggle" class="btn btn-green">{{setting.value}} - {{setting.displayName}}</button>
  </div>


</template>

<script>
import {BooleanSetting} from "@/ig-template/features/settings/BooleanSetting";

export default {
  name: "igt-boolean-setting",
  props: {
    setting: {
      type: BooleanSetting,
      required: true,
    }
  },
  methods: {
    toggle() {
      this.setting.toggle();
    },
  }
}
</script>

<style scoped>
</style>