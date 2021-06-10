<template>
  <div>
    <Breadcrumbs />
    <div class="flex flex-col space-y-4 mt-4 lg:grid lg:grid-cols-4 lg:space-y-0">
      <GroupCard v-for="group in groups" :key="group.id" :group="group"/>
    </div>
  </div>
</template>

<script>
import GroupCard from '@/components/teacher/groups/GroupCard.vue'
import Breadcrumbs from '~/components/UI/Breadcrumbs.vue';
export default {
  components: {
    GroupCard,
    Breadcrumbs
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
