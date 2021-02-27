<template>
  <div>
    <div class="flex flex-row flex-wrap">

      <button @click="buyPack(pack.id)" class="btn btn-blue flex flex-col justify-between items-center has-tooltip"
              v-for="pack in buyablePacks"
              :key="pack.id">
        <span>{{ pack.id }}</span>
        <span class="flex flex-row mx-2">
          {{ -pack.cost.amount }}
            <img class="mx-1 h-6 w-6" :src="require(`@/assets/coins.svg`)" alt="coins.svg">

            </span>
        <cq-card-pack-preview :pack-id="pack.id" class="tooltip mt-12"></cq-card-pack-preview>

      </button>
    </div>
  </div>
</template>

<script>

import CqCardPackPreview from "@/components/cq-card-pack-preview";
import {CardCollection} from "@/card-quest/features/card-collection/CardCollection";

export default {
  name: "cq-pack-shop",
  components: {CqCardPackPreview},
  props: {
    collection: {
      type: CardCollection,
      required: true,
    },
    packs: {
      type: Array,
      required: true,
    },
  },

  computed: {
    buyablePacks() {
      return this.packs.filter(pack => {
        return pack.buyable;
      });
    }
  },

  methods: {
    buyPack(id) {
      this.collection.buyCardPack(id);
    }
  },

}
</script>

<style scoped>

</style>
