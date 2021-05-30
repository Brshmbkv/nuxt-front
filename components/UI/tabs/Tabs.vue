<template>
  <article>
    <ul class="flex space-x-4 font-medium mt-3 cursor-pointer">
      <li
        v-for="(tab, index) in tabs"
        :key="index"
        :class="{ 'text-gray-400 font-semibold': tab.isActive }"
        @click="selectTab(tab);"
      >
        {{ tab.name }}
      </li>
    </ul>
    <slot></slot>
  </article>
</template>

<script>
export default {
  data() {
    return {
      tabs: []
    };
  },
  methods: {
    selectTab(selectedTab) {
      this.tabs.forEach(tab => {
        tab.isActive = tab.name === selectedTab.name;
      });
    }
  },
  created() {
    this.tabs = this.$children;
  }
};
</script>
