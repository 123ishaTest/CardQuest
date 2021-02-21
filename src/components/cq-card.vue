<template>

      <div class="w-32 h-64 border-2 bg-blue-400 cursor-pointer">
        {{ card.description }}
      </div>
</template>

<script>

import {ExampleCard} from "@/card-quest/cards/ExampleCard";

export default {
  name: "cq-card",
  data() {
    return {
    }
  },

  props: {
    card: {
      type: ExampleCard,
      required: true
    },
  },


}
</script>

<style scoped>

</style>
