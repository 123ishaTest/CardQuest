<template>
  <div class="feature-tab">
    <p class="text-2xl font-semibold text-white">Achievements</p>
    <hr/>
    <div class="flex flex-row flex-wrap">
      <div :key=achievement.id v-for="achievement in achievements" class="w-72">
        <div class="flex flex-col border-2 m-2 p-2 h-72 justify-between shadow-md"
             :class="{'bg-gray-400': !achievement.unlocked, 'bg-green-500': achievement.unlocked}">
          <div>
            <p class="text-lg font-semibold"> {{ achievement.unlocked ? achievement.title : '???' }}</p>
            <hr>
            <br>
            <p class="italic"> {{ achievement.description }}</p>
          </div>
          <img class="card-image" :class="{'filter-grayscale': !achievement.unlocked}"
               :src="require(`@/assets/${achievement.image}`)" :alt="achievement.image">
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
            title: 'Achievement get: ' + achievement.title,
            text: achievement.description,
            type: "success",
            group: "top-right",
          },
          8000
      );
    })
  }
}
</script>

<style scoped>

</style>
