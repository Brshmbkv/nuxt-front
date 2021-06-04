<template>
  <div>
    <p>Breadcrumbs</p>
    <h1 class="text-3xl font-semibold">Groups page</h1>
    <div class="flex mt-8">
      <GroupCard v-for="group in groups" :key="group.id" :group="group"/>
    </div>
    <pre>{{groups}}</pre>
  </div>
</template>

<script>
import GroupCard from '@/components/teacher/groups/GroupCard.vue'
export default {
  components: {
    GroupCard
  },
  data() {
    return {
      groups: []
    };
  },
  async asyncData({ $axios }) {
    const {data} = await $axios.$get("/teacher/groups")
    return { groups: data }
  }
};
</script>
