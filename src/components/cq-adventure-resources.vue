<template>
  <div class="flex flex-row p-2 border-2">
    <p class="text-lg m-2"> {{ wood }} Wood</p>
    <p class="text-lg m-2"> {{ souls }} Souls</p>
  </div>
</template>

<script>



import {Wallet} from "@/ig-template/features/wallet/Wallet";

export default {
  name: "cq-adventure-resources",
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
    wood() {
      return this.wallet.wood;
    },
    souls() {
      return this.wallet.souls;
    }
  }


}
</script>

<style scoped>

</style>
