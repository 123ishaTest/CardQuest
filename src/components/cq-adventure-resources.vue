<template>
  <div class="flex flex-row p-2 border-2">
    <cq-orb svg="wood.svg" :value="wallet.wood"></cq-orb>
    <cq-orb svg="souls.svg" :value="wallet.souls"></cq-orb>
    <cq-orb svg="bronze.svg" :value="wallet.bronze"></cq-orb>
    <cq-orb svg="silver.svg" :value="wallet.silver"></cq-orb>
    <cq-orb svg="gold.svg" :value="wallet.gold"></cq-orb>
  </div>
</template>

<script>



import {Wallet} from "@/ig-template/features/wallet/Wallet";
import CqOrb from "@/components/orbs/cq-orb";

export default {
  name: "cq-adventure-resources",
  components: {CqOrb},
  data() {
    return {}
  },

  props: {
    wallet: {
      type: Wallet,
      required: true
    },
  },

  computed: {

  }


}
</script>

<style scoped>

</style>
