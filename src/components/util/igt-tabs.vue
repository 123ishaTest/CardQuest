<template>
  <div>
    <div class="tabs" :class="headerClass">
      <ul class="flex flex-row">
        <li class="p-2 border-r-2" :key="'tab'+index" v-for="(tab, index) in tabs" :class="{ 'text-green-500': tab.isActive }">
          <a v-if="tab.canSelect" class="text-lg cursor-pointer" @click="selectTab(tab)">{{ tab.name }}</a>
          <span class="text-lg" v-else> {{ tab.name }}</span>
        </li>

        <slot name="other">

        </slot>
      </ul>
    </div>
    <hr/>

    <div class="tabs-details">
      <slot></slot>
    </div>
  </div>
</template>

<script>

export default {
  name: "igt-tabs",
  data() {
    return {tabs: []};
  },

  props: {
    headerClass: {
      type: String,
      default: ''
    },
  },

  created() {
    this.tabs = this.$children;
  },
  methods: {
    selectTab(selectedTab) {
      if(!selectedTab.canSelect) {
        return;
      }
      this.tabs.forEach(tab => {
        tab.isActive = (tab.name === selectedTab.name);
      });
    }
  }

}
</script>

<style scoped>

</style>
