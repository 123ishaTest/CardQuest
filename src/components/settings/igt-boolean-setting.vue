<template>
  <div>
    <button @click="toggle" class="btn btn-blue">
      <span class="fa text-lg m-1" :class="classObject"></span>
      <span>
        {{ setting.displayName }}
      </span>
    </button>
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
    },
  },
  methods: {
    toggle() {
      this.setting.toggle();
    },
  },
  computed: {
    classObject() {
      return {
        'fa-eye': this.setting.value,
        'text-green-500': this.setting.value,

        'fa-eye-slash': !this.setting.value,
        'text-red-500': !this.setting.value,
      }
    }
  }
}
</script>

<style scoped>
</style>