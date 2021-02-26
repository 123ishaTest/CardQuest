<template>
  <div class="bg-green-300 m-4 p-4">
    <p class="text-xl">Achievements</p>
    <hr/>
    <div class="flex flex-row">
      <div :key=achievement.id v-for="achievement in achievements">
        <div class="flex flex-col border-2 m-2 p-2">
          <p> {{ achievement.title }}</p>
          <p> {{ achievement.description }}</p>
          <p> Unlocked: {{ achievement.unlocked }}</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {Achievements} from "@/ig-template/features/achievements/Achievements";

export default {
  name: "igt-achievements",
  props: {
    achievementsFeature: {
      type: Achievements,
      required: true,
    },
  },

  computed: {
    achievements() {
      return this.achievementsFeature.list;
    }
  },

  mounted() {
    this.achievementsFeature.onUnlock.subscribe((achievement) => {
      this.$notify(
          {
            title: achievement.title,
            text: achievement.description,
            type: "success",
            group: "top-right",
          },
          4000
      );
    })
  }
}
</script>

<style scoped>

</style>
