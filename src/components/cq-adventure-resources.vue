<template>
  <div class="flex flex-row p-2 border-2">
    <p class="text-lg m-2"> {{wood}} Wood</p>
    <p class="text-lg m-2"> {{souls}} Souls</p>
  </div>
</template>

<script>


import {AdventureResources} from "@/card-quest/adventure/AdventureResources";

export default {
  name: "cq-adventure-resources",
  data() {
    return {
    }
  },

  props: {
    resources: {
      type: AdventureResources,
      required: true
    },
  },

  computed: {
    wood() {
      return this.resources.wood;
    },
    souls() {
      return this.resources.souls;
    }
  }


}
</script>

<style scoped>

</style>
