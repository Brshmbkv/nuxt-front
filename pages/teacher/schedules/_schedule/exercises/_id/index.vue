<template>
  <div>
    <p>Breadcrumbs</p>
    <pre>{{data}}</pre>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: []
    };
  },
  async asyncData({$axios, params}) {
    const res = await $axios.$get(
      `/teacher/schedules/${params.schedule}/exercises/${params.id}`
    );
    return {data: res}
  }
};
</script>
