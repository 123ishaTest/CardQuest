<template>
  <div class="my-4">
    <div class="flex flex-row flex-wrap">

      <div v-for="pack in buyablePacks" :key="pack.id" class="has-tooltip">
        <button @click="buyPack(pack.id)" class="btn btn-blue flex flex-col justify-between items-center"

                :disabled="!canAfford(pack)">
          <span>{{ pack.id }}</span>
          <span class="flex flex-row mx-2">
          {{ -pack.cost.amount }}
            <img class="mx-1 h-6 w-6" :src="require(`@/assets/coins.svg`)" alt="coins.svg">

            </span>

        </button>
        <cq-card-pack-preview :pack-id="pack.id" class="tooltip mt"></cq-card-pack-preview>
      </div>
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
    },
  },

  methods: {
    buyPack(id) {
      this.collection.buyCardPack(id);
    },
    canAfford(pack) {
      return this.collection.canBuyCardPack(pack.id);
    }
  },

}
</script>

<style scoped>

</style>
